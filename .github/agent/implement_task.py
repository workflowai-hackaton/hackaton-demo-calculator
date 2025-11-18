#!/usr/bin/env python3
import json
from pathlib import Path

def apply_change(spec, content):
    path = Path(spec["path"])
    path.parent.mkdir(parents=True, exist_ok=True)
    mode = spec.get("type", "replace")
    if mode == "replace":
        path.write_text(content, encoding="utf-8")
    elif mode == "append":
        with open(path, "a", encoding="utf-8") as f:
            f.write("\n" + content + "\n")
    else:
        raise ValueError(f"Unknown change type: {mode}")

def main():
    payload_path = ".github/agent/payload.json"
    p = json.loads(Path(payload_path).read_text(encoding="utf-8"))
    files = p.get("files", [])
    content = p.get("content", "")
    # Apply requested changes (or invoke your LLM/service here)
    for spec in files:
        apply_change(spec, content)

    # Optional: run tests or linters and exit non-zero if failing to block PR creation
    # Example:
    # import subprocess
    # subprocess.run(["pytest", "-q"], check=False)

if __name__ == "__main__":
    main()
