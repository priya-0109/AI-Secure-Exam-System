def paraphrase_text(text):

    replacements = {
        "What is": "Explain",
        "Define": "Describe",
        "List": "Mention",
        "Write": "Provide details about",
        "Explain": "Discuss"
    }

    for old, new in replacements.items():
        text = text.replace(old, new)

    return text