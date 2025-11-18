#!/usr/bin/env python3
import argparse
import json
import os
import sys
import urllib.request
import urllib.error

def set_output(name, value):
    # Emit outputs for the workflow step
    github_output = os.environ.get("GITHUB_OUTPUT")
    if github_output:
        with open(github_output, "a") as f:
            f.write(f"{name}={value}\n")

def gh_api(url, method="GET", token=None, body=None):
    req = urllib.request.Request(url, method=method)
    req.add_header("Accept", "application/vnd.github+json")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    if body is not None:
        data = json.dumps(body).encode("utf-8")
        req.add_header("Content-Type", "application/json")
    else:
        data = None
    try:
        with urllib.request.urlopen(req, data=data, timeout=60) as resp:
            charset = resp.headers.get_content_charset() or "utf-8"
            txt = resp.read().decode(charset)
            return resp.getcode(), json.loads(txt) if txt else {}
    except urllib.error.HTTPError as e:
        err_txt = e.read().decode("utf-8", errors="replace")
        print(f"GitHub API error {e.code}: {err_txt}", file=sys.stderr)
        return e.code, None
    except Exception as e:
        print(f"Request failed: {e}", file=sys.stderr)
        return 0, None

def build_issue_body(payload):
    title = payload.get("title") or f"Agent task {payload.get('task_id','')}".strip()
    summary = payload.get("summary") or "No summary provided."
    acceptance = payload.get("acceptance_criteria") or "No acceptance criteria provided."
    base = payload.get("base") or "main"
    focus_paths = payload.get("focus_paths") or []
    stack_hint = payload.get("stack_hint") or ""
    extra = payload.get("extra") or {}

    lines = []
    lines.append(f"Task ID: {payload.get('task_id', 'N/A')}")
    lines.append("")
    lines.append("Summary")
    lines.append("-------")
    lines.append(summary)
    lines.append("")
    lines.append("Acceptance criteria")
    lines.append("-------------------")
    if isinstance(acceptance, list):
        lines.extend([f"- {item}" for item in acceptance])
    else:
        lines.append(acceptance)
    lines.append("")
    lines.append("Context")
    lines.append("-------")
    lines.append(f"- Base branch: `{base}`")
    if focus_paths:
        lines.append(f"- Focus paths: {', '.join(focus_paths)}")
    if stack_hint:
        lines.append(f"- Stack hint: {stack_hint}")
    if "related_issues" in extra:
        lines.append(f"- Related issues: {extra['related_issues']}")
    if "links" in extra:
        lines.append(f"- Links: {extra['links']}")
    lines.append("")
    lines.append("How to proceed")
    lines.append("--------------")
    lines.append("- Use Copilot Workspace from this issue (if enabled) to generate a plan and open a PR; or")
    lines.append('- Use Copilot Chat: ask "Plan and implement this task with tests" and iterate.')
    lines.append("")
    lines.append("Notes")
    lines.append("-----")
    lines.append("This issue was created automatically by workflow.ai.")
    body = "\n".join(lines)
    return title, body

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--payload", required=True)
    args = parser.parse_args()

    with open(args.payload, "r", encoding="utf-8") as f:
        payload = json.load(f)

    gh_repo = os.environ.get("GH_REPO")
    gh_token = os.environ.get("GH_TOKEN")
    if not gh_repo or not gh_token:
        print("Missing GH_REPO or GH_TOKEN env vars.", file=sys.stderr)
        sys.exit(1)

    owner, repo = gh_repo.split("/", 1)
    title, body = build_issue_body(payload)

    # Labels/assignees are optional in payload
    labels = payload.get("labels") or ["agent-task", "copilot-ready"]
    assignees = payload.get("assignees") or []  # usernames list

    issue_payload = {
        "title": title,
        "body": body,
        "labels": labels
    }
    if assignees:
        issue_payload["assignees"] = assignees

    url = f"https://api.github.com/repos/{owner}/{repo}/issues"
    status, resp = gh_api(url, method="POST", token=gh_token, body=issue_payload)
    if status == 201 and resp:
        number = resp.get("number")
        html_url = resp.get("html_url")
        print(f"Created issue #{number}: {html_url}")
        set_output("issue_number", str(number))
        set_output("issue_url", html_url)
        sys.exit(0)
    else:
        print(f"Failed to create issue. Status={status}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
