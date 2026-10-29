import type { CSSProperties } from "react"

type CodeLine = {
  text: string
  side: "left" | "right"
  offset: number
  top: number
  rotate: number
  size: number
  opacity: number
  tone: "accent" | "positive"
  at: number
  /* Horizontal rest drift from the entry edge: positive moves a left line
     inward (and further for a right line), so lines fan between the margin and
     the middle instead of stacking into two tidy columns. */
  drift: number
  /* How much of the scroll range the line takes to travel, in percent. */
  span: number
}

/* Decorative page background: high-level code first, machine words and bytes
   further down. Each line flies in from its screen edge at its own scroll depth
   and settles at a scattered position; add new lines in ascending `at` order. */
const codeLines: CodeLine[] = [
  { text: "const server = await boot()", side: "left", offset: 0.5, top: 6, rotate: -5, size: 26, opacity: 0.17, tone: "accent", at: 0.02, drift: 90, span: 16 },
  { text: "struct sockaddr_in sa;", side: "right", offset: 0.5, top: 9, rotate: 4, size: 19, opacity: 0.14, tone: "accent", at: 0.03, drift: -170, span: 21 },
  { text: "push rbp", side: "left", offset: 9, top: 15, rotate: 3, size: 15, opacity: 0.11, tone: "positive", at: 0.06, drift: 40, span: 12 },
  { text: "jmp 0x401100", side: "right", offset: 8, top: 18, rotate: -5, size: 15, opacity: 0.12, tone: "positive", at: 0.08, drift: -60, span: 14 },
  { text: "def inspect(hosts):", side: "left", offset: 1.5, top: 24, rotate: -2, size: 20, opacity: 0.14, tone: "accent", at: 0.11, drift: 260, span: 20 },
  { text: "while (1) {", side: "right", offset: 1, top: 27, rotate: 3, size: 21, opacity: 0.13, tone: "accent", at: 0.14, drift: -300, span: 19 },
  { text: "if err != nil {", side: "left", offset: 7, top: 32, rotate: 6, size: 17, opacity: 0.12, tone: "accent", at: 0.17, drift: 30, span: 13 },
  { text: "call 0x401000", side: "right", offset: 6, top: 37, rotate: -3, size: 17, opacity: 0.11, tone: "positive", at: 0.2, drift: -40, span: 15 },
  { text: "int main(void) {", side: "left", offset: 0.5, top: 43, rotate: -6, size: 22, opacity: 0.15, tone: "accent", at: 0.24, drift: 180, span: 24 },
  { text: "55 48 89 e5", side: "right", offset: 3, top: 46, rotate: 5, size: 15, opacity: 0.12, tone: "positive", at: 0.28, drift: -220, span: 16 },
  { text: "xor eax, eax", side: "left", offset: 10, top: 52, rotate: 2, size: 15, opacity: 0.1, tone: "positive", at: 0.31, drift: 50, span: 12 },
  { text: "for (size_t i = 0; i < n; ++i)", side: "right", offset: 4, top: 58, rotate: -6, size: 22, opacity: 0.14, tone: "accent", at: 0.36, drift: -110, span: 26 },
  { text: "mov rax, [rbp-0x8]", side: "left", offset: 3, top: 61, rotate: -3, size: 19, opacity: 0.14, tone: "positive", at: 0.38, drift: 210, span: 18 },
  { text: "01101001 01101110", side: "right", offset: 0.5, top: 69, rotate: 2, size: 17, opacity: 0.12, tone: "positive", at: 0.44, drift: -80, span: 20 },
  { text: "48 89 e5 0f 05", side: "left", offset: 8, top: 71, rotate: 5, size: 17, opacity: 0.12, tone: "positive", at: 0.46, drift: 60, span: 14 },
  { text: "55 48 89 e5 48 83 ec 20", side: "right", offset: 7, top: 79, rotate: -2, size: 19, opacity: 0.13, tone: "positive", at: 0.53, drift: -250, span: 22 },
  { text: "01001000 01100101 01101100 01101100", side: "left", offset: 0.5, top: 81, rotate: -4, size: 24, opacity: 0.15, tone: "positive", at: 0.55, drift: 320, span: 24 },
  { text: "0f 1f 44 00 00", side: "left", offset: 11, top: 90, rotate: 3, size: 15, opacity: 0.1, tone: "positive", at: 0.63, drift: 70, span: 13 },
  { text: "01001000 01100101 01101100 01101100 01101111", side: "right", offset: 0.5, top: 90, rotate: -4, size: 20, opacity: 0.13, tone: "positive", at: 0.64, drift: -160, span: 20 },
]

/* Bottom band of bytes: long rows, wider than any viewport, so the band stays
   continuous edge to edge and simply clips on the sides. */
const binaryRows = [
  "00101000 01110010 00111011 00111000 01101100 01101111 00110001 00100000 01100100 00110100 01101100 00101111 01101110 01101100 00101100 01111101 01111011 01101111 00100000 00101100 00110010 01111101 01101100 00110011 01110111 01110100",
  "00110111 00110111 00110100 01101100 00110011 00110100 00111011 01101100 01110100 01101100 00110010 01101111 01101001 01111011 01110010 00110001 01110111 00110011 01101110 00110010 01100100 00100000 00110100 00110011 00110111 01101001",
  "01100100 00100000 00110010 01101111 00110011 01101100 00110110 01101110 00101010 00110001 01111101 00101000 00101011 00110100 00101011 01100100 01101110 00100000 01100100 00100000 00101100 00110011 01101110 00110000 00101010 01110110",
  "00111101 01101001 00110101 01101111 01110111 00101111 01111011 01101100 01110110 01110010 00101010 01111011 01101100 00111001 01101111 00110010 00110011 00101000 01110110 01101111 00110101 00101010 00110100 00101011 01101111 00101100",
  "01100001 00101101 00111001 01101111 01101100 01101110 00111000 00110011 00111101 01101001 00101001 00111001 01101111 01100101 00101011 01101111 01101100 00110110 01110111 00101010 01101100 01101110 01101001 01101111 00100000 00111011",
  "00111011 00101010 00101100 01101100 00111101 00111011 00110010 01100001 01101111 01111101 00110010 01100001 01111011 01101111 00101001 01110100 01110010 00101100 01100100 01110010 01110100 00111001 01110100 01001000 00101010 00110100",
  "01100100 01101101 01101001 01001000 01110010 01111011 00110001 01100100 00110110 00110011 00101000 01101111 00101111 00110110 00111000 01101100 00101011 00110010 00111011 00111011 00111011 00111011 00100000 00101101 00110111 00111011",
  "01101100 01101001 01101111 01101110 00111101 01101100 01110111 01110110 00110101 01101100 00100000 01001000 00110011 01110010 00110001 00100000 01100100 00110110 01100101 01101111 01101110 00110110 00101001 01110010 00110111 01101101",
  "01101111 00110101 01100100 00101101 01110111 01110111 00101010 00101011 00101101 00101101 01101110 00101100 01110010 00100000 01110110 01101101 00101101 01101100 00110000 01100101 01101110 00110000 01100100 01110010 00110001 01100101",
  "00110000 01101110 00111000 00101100 01101101 00110000 01100100 01101100 01101111 01110100 00110001 00110001 00101111 01110110 00110111 01110100 00110110 01101001 00100000 00111011 01110100 01101001 00110000 00101010 01101111 01100101",
  "01100101 01100001 00101101 01101101 01101001 00110101 01101111 00111101 01101111 01100100 00101100 01110100 00100000 01110100 00101101 01101001 01110110 01101110 00101101 00110110 00110110 01001000 00101101 00111000 01101111 00111000",
  "00101100 00111001 01110111 00101001 01101001 00101101 01100100 01111101 00110111 01110110 00101100 00111011 00101011 00111011 00101100 01101100 01101100 01101111 01100101 01110010 00110100 00101011 00111000 01110010 00110110 00110101",
]

export function ScrollCodeBackdrop() {
  return (
    <>
      <div className="code-scatter" aria-hidden="true">
        {codeLines.map((line) => (
          <span
            key={line.text}
            className={`code-scatter-line font-mono${line.side === "right" ? " from-right" : ""}${
              line.tone === "positive" ? " code-tone-positive" : ""
            }`}
            style={
              {
                top: `${line.top}%`,
                left: line.side === "left" ? `${line.offset}%` : undefined,
                right: line.side === "right" ? `${line.offset}%` : undefined,
                fontSize: `${line.size}px`,
                "--rot": `${line.rotate}deg`,
                "--opacity": line.opacity,
                "--drift": `${line.drift}px`,
                "--range-start": `${line.at * 100}%`,
                "--range-end": `${line.at * 100 + line.span}%`,
              } as CSSProperties
            }
          >
            {line.text}
          </span>
        ))}
      </div>

      <div className="binary-veil font-mono" aria-hidden="true">
        {binaryRows.map((row) => (
          <span key={row} className="block">
            {row}
          </span>
        ))}
      </div>
    </>
  )
}
