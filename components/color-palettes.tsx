'use client'

import React, { useState, useEffect } from 'react'
import { Moon, Sun, Copy } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ColorSet {
  light: string;
  dark: string;
}

interface ColorPalette {
  [key: string]: ColorSet;
}

interface PaletteProps {
  colors: ColorPalette;
  isDark: boolean;
}

const ColorPalette: React.FC<PaletteProps> = ({ colors, isDark }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color).then(() => {
      setCopiedColor(color)
      setTimeout(() => setCopiedColor(null), 2000)
    })
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Object.entries(colors).map(([name, color]) => {
        const currentColor = color[isDark ? 'dark' : 'light']
        return (
          <div key={name} className="flex flex-col items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative w-20 h-20 rounded-md shadow-md group">
                    <div
                      className="w-full h-full rounded-md"
                      style={{ backgroundColor: currentColor }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-md">
                      <span className="text-white text-xs font-mono">{currentColor}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 bg-transparent hover:bg-black"
                        onClick={() => copyToClipboard(currentColor)}
                      >
                        <Copy className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {copiedColor === currentColor ? 'Copied!' : 'Click to copy'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="mt-2 text-sm">{name}</span>
          </div>
        )
      })}
    </div>
  )
}

const palettes: Record<string, ColorPalette> = {
  onchainKitDefault: {
    textInverse: { light: '#f9fafb', dark: '#030712' },
    textForeground: { light: '#030712', dark: '#f9fafb' },
    textForegroundMuted: { light: '#4b5563', dark: '#9ca3af' },
    textError: { light: '#e11d48', dark: '#fb7185' },
    textPrimary: { light: '#4f46e5', dark: '#818cf8' },
    textSuccess: { light: '#65a30d', dark: '#a3e635' },
    textWarning: { light: '#ea580c', dark: '#fb923c' },
    textDisabled: { light: '#9ca3af', dark: '#4b5563' },
    bgDefault: { light: '#f9fafb', dark: '#030712' },
    bgDefaultHover: { light: '#e5e7eb', dark: '#1f2937' },
    bgDefaultActive: { light: '#d1d5db', dark: '#374151' },
    bgAlternate: { light: '#e5e7eb', dark: '#1f2937' },
    bgAlternateHover: { light: '#d1d5db', dark: '#374151' },
    bgAlternateActive: { light: '#9ca3af', dark: '#4b5563' },
    bgInverse: { light: '#f3f4f6', dark: '#111827' },
    bgInverseHover: { light: '#e5e7eb', dark: '#1f2937' },
    bgInverseActive: { light: '#d1d5db', dark: '#374151' },
    bgPrimary: { light: '#4f46e5', dark: '#818cf8' },
    bgPrimaryHover: { light: '#4338ca', dark: '#a5b4fc' },
    bgPrimaryActive: { light: '#3730a3', dark: '#c7d2fe' },
    bgSecondary: { light: '#e2e8f0', dark: '#1e293b' },
    bgSecondaryHover: { light: '#cbd5e1', dark: '#334155' },
    bgSecondaryActive: { light: '#94a3b8', dark: '#475569' },
    bgError: { light: '#e11d48', dark: '#fb7185' },
    bgWarning: { light: '#ea580c', dark: '#fb923c' },
    bgSuccess: { light: '#bef264', dark: '#4d7c0f' },
    bgDefaultReverse: { light: '#030712', dark: '#f9fafb' },
  },
  // ... (other palettes remain unchanged)
}

const generateRandomColor = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
}

const generateRandomPalette = (): ColorPalette => {
  const colorNames = [
    'textInverse', 'textForeground', 'textForegroundMuted', 'textError', 'textPrimary',
    'textSuccess', 'textWarning', 'textDisabled', 'bgDefault', 'bgDefaultHover',
    'bgDefaultActive', 'bgAlternate', 'bgAlternateHover', 'bgAlternateActive',
    'bgInverse', 'bgInverseHover', 'bgInverseActive', 'bgPrimary', 'bgPrimaryHover',
    'bgPrimaryActive', 'bgSecondary', 'bgSecondaryHover', 'bgSecondaryActive',
    'bgError', 'bgWarning', 'bgSuccess', 'bgDefaultReverse'
  ]

  const randomPalette: ColorPalette = {}
  colorNames.forEach(name => {
    randomPalette[name] = {
      light: generateRandomColor(),
      dark: generateRandomColor()
    }
  })

  return randomPalette
}

export function ColorPalettes() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [luckyPalette, setLuckyPalette] = useState<ColorPalette | null>(null)
  const [currentPalette, setCurrentPalette] = useState<string>('onchainKitDefault')
  const [generatedCSS, setGeneratedCSS] = useState<string>('')
  const [isCopied, setIsCopied] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)
  }

  const generateLuckyPalette = () => {
    setLuckyPalette(generateRandomPalette())
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const generateThemeCSS = () => {
    const selectedPalette = currentPalette === 'lucky' ? luckyPalette : palettes[currentPalette as keyof typeof palettes]
    let css = '@layer base {\n  :root {\n'
    Object.entries(selectedPalette).forEach(([key, value]) => {
      const hsl = hexToHSL(value.light)
      css += `    --${key}: ${hsl};\n`
    })
    css += '  }\n\n  .dark {\n'
    Object.entries(selectedPalette).forEach(([key, value]) => {
      const hsl = hexToHSL(value.dark)
      css += `    --${key}: ${hsl};\n`
    })
    css += '  }\n}'
    setGeneratedCSS(css)
  }

  const hexToHSL = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return '0 0% 0%'
    
    let r = parseInt(result[1], 16)
    let g = parseInt(result[2], 16)
    let b = parseInt(result[3], 16)
    
    r /= 255
    g /= 255
    b /= 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s, l = (max + min) / 2
    
    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }
    
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCSS).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <div className="p-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">OnchainKit Themes</h1>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
            <Moon className="h-4 w-4" />
          </div>
        </div>
        <Tabs 
          defaultValue="onchainKitDefault" 
          className="space-y-8"
          onValueChange={(value) => setCurrentPalette(value)}
        >
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="onchainKitDefault">Default</TabsTrigger>
              <TabsTrigger value="warm">Warm</TabsTrigger>
              <TabsTrigger value="nature">Nature</TabsTrigger>
              <TabsTrigger value="vibrant">Vibrant</TabsTrigger>
              <TabsTrigger value="cool">Cool</TabsTrigger>
              <TabsTrigger value="lucky">Lucky</TabsTrigger>
            </TabsList>
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={generateThemeCSS} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy theme
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px] h-[70vh] flex flex-col bg-white">
                <DialogHeader>
                  <DialogTitle className="text-black">Theme</DialogTitle>
                  <DialogDescription>
                    Copy and paste the following code into your CSS file.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex-grow overflow-y-auto">
                  <div className="relative h-full">
                    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto h-full">
                      <code className="text-black">{generatedCSS}</code>
                    </pre>
                    <Button
                      className="absolute top-2 right-2"
                      size="sm"
                      onClick={copyToClipboard}
                    >
                      {isCopied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <TabsContent value="onchainKitDefault">
            <ColorPalette colors={palettes.onchainKitDefault} isDark={isDarkMode} />
          </TabsContent>
          <TabsContent value="warm">
            <ColorPalette colors={palettes.warm} isDark={isDarkMode} />
          </TabsContent>
          <TabsContent value="nature">
            <ColorPalette colors={palettes.nature} isDark={isDarkMode} />
          </TabsContent>
          <TabsContent value="vibrant">
            <ColorPalette colors={palettes.vibrant} isDark={isDarkMode} />
          </TabsContent>
          <TabsContent value="cool">
            <ColorPalette colors={palettes.cool} isDark={isDarkMode} />
          </TabsContent>
          <TabsContent value="lucky">
            <div className="space-y-4">
              <Button onClick={generateLuckyPalette}>Generate Lucky Palette</Button>
              {luckyPalette && <ColorPalette colors={luckyPalette} isDark={isDarkMode} />}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}