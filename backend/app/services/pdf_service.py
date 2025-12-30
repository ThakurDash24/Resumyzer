import pdfplumber
from fastapi import UploadFile

def extract_text_from_pdf(file: UploadFile) -> str:
    text = ""

    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

    return text.strip()
