"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download } from "lucide-react"

export default function QRCodeGenerator() {
  const [text, setText] = useState("")
  const [size, setSize] = useState(512)

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code")
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      canvas.width = size
      canvas.height = size
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")

      const downloadLink = document.createElement("a")
      downloadLink.download = "qrcode.png"
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">QR Code Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="text" className="text-sm font-medium">
              Enter text or URL
            </label>
            <Input
              id="text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="size" className="text-sm font-medium">
              QR Code Size: {size}px
            </label>
            <Slider
              id="size"
              min={128}
              max={512}
              step={32}
              value={[size]}
              onValueChange={(value) => setSize(value[0])}
              className="w-full"
            />
          </div>

          <div className="flex justify-center bg-white p-4 rounded-lg">
            <QRCodeSVG
              id="qr-code"
              value={text || ""}
              size={size}
              level="H"
              includeMargin
              className="h-auto w-full max-w-[256px]"
            />
          </div>

          <Button
            onClick={downloadQRCode}
            className="w-full"
            disabled={!text}
          >
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

