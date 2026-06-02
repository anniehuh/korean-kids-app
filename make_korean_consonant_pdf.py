from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont

pdfmetrics.registerFont(UnicodeCIDFont("HYSMyeongJo-Medium"))

pages = [
    ["가", "나", "다", "라", "마"],
    ["바", "사", "아", "자", "차"],
    ["카", "타", "파", "하", ""]
]

filename= "worksheets/Korean_Consonants_5x8_Practice.pdf"

c = canvas.Canvas(filename, pagesize=letter)
page_width, page_height = letter

margin = 0.5 * inch
cols = 5
rows = 8

grid_width = page_width - 2 * margin
grid_height = page_height - 2 * margin

cell_width = grid_width / cols
cell_height = grid_height / rows

font_name = "HYSMyeongJo-Medium"

for syllables in pages:
    # Draw grid
    for col in range(cols + 1):
        x = margin + col * cell_width
        c.line(x, margin, x, margin + grid_height)

    for row in range(rows + 1):
        y = margin + row * cell_height
        c.line(margin, y, margin + grid_width, y)

    # Put one syllable per box, starting from top-left
    for i, syllable in enumerate(syllables):
        col = i % cols
        row = i // cols

        x = margin + col * cell_width + cell_width / 2
        y = margin + grid_height - row * cell_height - cell_height / 2

        c.setFont(font_name, 36)
        c.drawCentredString(x, y - 12, syllable)

    c.showPage()

c.save()

print(f"Created: {filename}")