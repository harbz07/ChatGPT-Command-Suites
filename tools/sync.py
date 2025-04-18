
import json
import os
import argparse
from pathlib import Path

def blueprint_to_suite(blueprint, min_words=300):
    return {
        "title": blueprint.get("name", ""),
        "description": blueprint.get("flavor", ""),
        "metadata": {
            "document_type": blueprint["metadata"].get("output_format", "plain text"),
            "specific_action": blueprint["metadata"].get("usage", ""),
            "tone": blueprint["metadata"].get("tone", "neutral"),
            "target_audience": blueprint.get("category", "General"),
            "min_words": min_words
        }
    }

def sync(blueprint_path, suite_output_path, min_words=300):
    with open(blueprint_path, "r") as infile:
        blueprint = json.load(infile)
    suite_command = blueprint_to_suite(blueprint, min_words)
    with open(suite_output_path, "w") as outfile:
        json.dump(suite_command, outfile, indent=2)
    print(f"✅ Synced: {suite_output_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sync Blueprint → Suite Command JSON")
    parser.add_argument("--from", dest="source", required=True, help="Path to blueprint JSON")
    parser.add_argument("--to", dest="destination", required=True, help="Path to suite JSON output")
    parser.add_argument("--min_words", type=int, default=300, help="Minimum word count for suite command")
    args = parser.parse_args()

    sync(args.source, args.destination, args.min_words)
