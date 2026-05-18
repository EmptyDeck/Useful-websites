import re

def split_into_sentences(text):
    # Basic sentence splitter
    sentences = re.split(r'(?<=[.!?])\s+', text.replace('\n', ' '))
    return [s.strip() for s in sentences if s.strip()]

with open(r'C:\AAAA\Useful-websites\Temp\thesis.txt', 'r', encoding='utf-8') as f:
    content = f.read()

sentences = split_into_sentences(content)

# We will handle the translation blocks. 
# Since I am the AI, I will provide the translated blocks in the script's output 
# or just generate the file directly if I can.
# Actually, I'll just use the script to prepare the structure and I'll fill it.

# But I can just do it in one go in the next thought.
