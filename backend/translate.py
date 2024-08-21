import sys
import io
from googletrans import Translator

# Ensure stdout uses UTF-8 encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def translate_text(source_lang, target_lang, text):
    translator = Translator()
    try:
        translated = translator.translate(text, src=source_lang, dest=target_lang)
        return translated.text
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    source_lang = sys.argv[1]
    target_lang = sys.argv[2]
    text = sys.argv[3]

    result = translate_text(source_lang, target_lang, text)
    print(result)  # Output result for PHP to capture
