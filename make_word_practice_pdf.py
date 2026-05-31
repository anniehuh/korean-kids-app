from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont

pdfmetrics.registerFont(UnicodeCIDFont("HYSMyeongJo-Medium"))

words_input = input("Enter up to 10 words separated by commas:\n")

words = [w.strip() for w in words_input.split(",") if w.strip()]

filename = "worksheets/Korean_Word_Practice.pdf"

c = canvas.Canvas(filename, pagesize=letter)

page_width, page_height = letter

margin = 0.5 * inch

cols = 5
rows = 10

grid_width = page_width - (2 * margin)
grid_height = page_height - (2 * margin)

cell_width = grid_width / cols
cell_height = grid_height / rows

for col in range(cols + 1):
    x = margin + col * cell_width
    c.line(x, margin, x, margin + grid_height)

for row in range(rows + 1):
    y = margin + row * cell_height
    c.line(margin, y, margin + grid_width, y)

for row, word in enumerate(words[:10]):
    x = margin + cell_width / 2
    y = margin + grid_height - ((row + 0.5) * cell_height)

    c.setFont("HYSMyeongJo-Medium", 24)
    c.drawCentredString(x, y - 8, word)

c.save()

print(f"Created: {filename}")