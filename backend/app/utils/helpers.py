import hashlib

def generate_resume_hash(text: str) -> str:
    """
    Generate a stable hash of resume text
    Used for deduplication and analytics
    """
    return hashlib.sha256(text.encode("utf-8")).hexdigest()
