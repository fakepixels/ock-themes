'use client'

import React, { useState, useEffect } from 'react'
import { Moon, Sun, Copy } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

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
  warm: {
    textInverse: { light: '#FFFBEB', dark: '#1C1917' },
    textForeground: { light: '#1C1917', dark: '#FFFBEB' },
    textForegroundMuted: { light: '#78716C', dark: '#A8A29E' },
    textError: { light: '#DC2626', dark: '#FCA5A5' },
    textPrimary: { light: '#D97706', dark: '#FBBF24' },
    textSuccess: { light: '#65A30D', dark: '#A3E635' },
    textWarning: { light: '#EA580C', dark: '#FB923C' },
    textDisabled: { light: '#A8A29E', dark: '#78716C' },
    bgDefault: { light: '#FFFBEB', dark: '#1C1917' },
    bgDefaultHover: { light: '#FEF3C7', dark: '#292524' },
    bgDefaultActive: { light: '#FDE68A', dark: '#44403C' },
    bgAlternate: { light: '#FEF3C7', dark: '#292524' },
    bgAlternateHover: { light: '#FDE68A', dark: '#44403C' },
    bgAlternateActive: { light: '#FCD34D', dark: '#57534E' },
    bgInverse: { light: '#FEF3C7', dark: '#292524' },
    bgInverseHover: { light: '#FDE68A', dark: '#44403C' },
    bgInverseActive: { light: '#FCD34D', dark: '#57534E' },
    bgPrimary: { light: '#D97706', dark: '#FBBF24' },
    bgPrimaryHover: { light: '#B45309', dark: '#F59E0B' },
    bgPrimaryActive: { light: '#92400E', dark: '#D97706' },
    bgSecondary: { light: '#FEF3C7', dark: '#292524' },
    bgSecondaryHover: { light: '#FDE68A', dark: '#44403C' },
    bgSecondaryActive: { light: '#FCD34D', dark: '#57534E' },
    bgError: { light: '#DC2626', dark: '#FCA5A5' },
    bgWarning: { light: '#EA580C', dark: '#FB923C' },
    bgSuccess: { light: '#BEF264', dark: '#4D7C0F' },
    bgDefaultReverse: { light: '#1C1917', dark: '#FFFBEB' },
  },
  nature: {
    textInverse: { light: '#ECFDF5', dark: '#042F2E' },
    textForeground: { light: '#042F2E', dark: '#ECFDF5' },
    textForegroundMuted: { light: '#065F46', dark: '#A7F3D0' },
    textError: { light: '#DC2626', dark: '#FCA5A5' },
    textPrimary: { light: '#059669', dark: '#10B981' },
    textSuccess: { light: '#16A34A', dark: '#4ADE80' },
    textWarning: { light: '#D97706', dark: '#FBBF24' },
    textDisabled: { light: '#A7F3D0', dark: '#065F46' },
    bgDefault: { light: '#ECFDF5', dark: '#042F2E' },
    bgDefaultHover: { light: '#D1FAE5', dark: '#064E3B' },
    bgDefaultActive: { light: '#A7F3D0', dark: '#065F46' },
    bgAlternate: { light: '#D1FAE5', dark: '#064E3B' },
    bgAlternateHover: { light: '#A7F3D0', dark: '#065F46' },
    bgAlternateActive: { light: '#6EE7B7', dark: '#047857' },
    bgInverse: { light: '#D1FAE5', dark: '#064E3B' },
    bgInverseHover: { light: '#A7F3D0', dark: '#065F46' },
    bgInverseActive: { light: '#6EE7B7', dark: '#047857' },
    bgPrimary: { light: '#059669', dark: '#10B981' },
    bgPrimaryHover: { light: '#047857', dark: '#34D399' },
    bgPrimaryActive: { light: '#065F46', dark: '#6EE7B7' },
    bgSecondary: { light: '#D1FAE5', dark: '#064E3B' },
    bgSecondaryHover: { light: '#A7F3D0', dark: '#065F46' },
    bgSecondaryActive: { light: '#6EE7B7', dark: '#047857' },
    bgError: { light: '#DC2626', dark: '#FCA5A5' },
    bgWarning: { light: '#D97706', dark: '#FBBF24' },
    bgSuccess: { light: '#BEF264', dark: '#4D7C0F' },
    bgDefaultReverse: { light: '#042F2E', dark: '#ECFDF5' },
  },
  vibrant: {
    textInverse: { light: '#FAF5FF', dark: '#2E1065' },
    textForeground: { light: '#2E1065', dark: '#FAF5FF' },
    textForegroundMuted: { light: '#5B21B6', dark: '#DDD6FE' },
    textError: { light: '#EF4444', dark: '#FCA5A5' },
    textPrimary: { light: '#7C3AED', dark: '#A78BFA' },
    textSuccess: { light: '#10B981', dark: '#34D399' },
    textWarning: { light: '#F59E0B', dark: '#FCD34D' },
    textDisabled: { light: '#DDD6FE', dark: '#5B21B6' },
    bgDefault: { light: '#FAF5FF', dark: '#2E1065' },
    bgDefaultHover: { light: '#F3E8FF', dark: '#4C1D95' },
    bgDefaultActive: { light: '#E9D5FF', dark: '#5B21B6' },
    bgAlternate: { light: '#F3E8FF', dark: '#4C1D95' },
    bgAlternateHover: { light: '#E9D5FF', dark: '#5B21B6' },
    bgAlternateActive: { light: '#D8B4FE', dark: '#6D28D9' },
    bgInverse: { light: '#F3E8FF', dark: '#4C1D95' },
    bgInverseHover: { light: '#E9D5FF', dark: '#5B21B6' },
    bgInverseActive: { light: '#D8B4FE', dark: '#6D28D9' },
    bgPrimary: { light: '#7C3AED', dark: '#A78BFA' },
    bgPrimaryHover: { light: '#6D28D9', dark: '#8B5CF6' },
    bgPrimaryActive: { light: '#5B21B6', dark: '#7C3AED' },
    bgSecondary: { light: '#F3E8FF', dark: '#4C1D95' },
    bgSecondaryHover: { light: '#E9D5FF', dark: '#5B21B6' },
    bgSecondaryActive: { light: '#D8B4FE', dark: '#6D28D9' },
    bgError: { light: '#EF4444', dark: '#FCA5A5' },
    bgWarning: { light: '#F59E0B', dark: '#FCD34D' },
    bgSuccess: { light: '#10B981', dark: '#34D399' },
    bgDefaultReverse: { light: '#2E1065', dark: '#FAF5FF' },
  },
  cool: {
    textInverse: { light: '#F0F9FF', dark: '#082F49' },
    textForeground: { light: '#082F49', dark: '#F0F9FF' },
    textForegroundMuted: { light: '#0C4A6E', dark: '#BAE6FD' },
    textError: { light: '#DC2626', dark: '#FCA5A5' },
    textPrimary: { light: '#0284C7', dark: '#38BDF8' },
    textSuccess: { light: '#16A34A', dark: '#4ADE80' },
    textWarning: { light: '#D97706', dark: '#FBBF24' },
    textDisabled: { light: '#BAE6FD', dark: '#0C4A6E' },
    bgDefault: { light: '#F0F9FF', dark: '#082F49' },
    bgDefaultHover: { light: '#E0F2FE', dark: '#0C4A6E' },
    bgDefaultActive: { light: '#BAE6FD', dark: '#0E7490' },
    bgAlternate: { light: '#E0F2FE', dark: '#0C4A6E' },
    bgAlternateHover: { light: '#BAE6FD', dark: '#0E7490' },
    bgAlternateActive: { light: '#7DD3FC', dark: '#0369A1' },
    bgInverse: { light: '#E0F2FE', dark: '#0C4A6E' },
    bgInverseHover: { light: '#BAE6FD', dark: '#0E7490' },
    bgInverseActive: { light: '#7DD3FC', dark: '#0369A1' },
    bgPrimary: { light: '#0284C7', dark: '#38BDF8' },
    bgPrimaryHover: { light: '#0369A1', dark: '#0EA5E9' },
    bgPrimaryActive: { light: '#075985', dark: '#0284C7' },
    bgSecondary: { light: '#E0F2FE', dark: '#0C4A6E' },
    bgSecondaryHover: { light: '#BAE6FD', dark: '#0E7490' },
    bgSecondaryActive: { light: '#7DD3FC', dark: '#0369A1' },
    bgError: { light: '#DC2626', dark: '#FCA5A5' },
    bgWarning: { light: '#D97706', dark: '#FBBF24' },
    bgSuccess: { light: '#16A34A', dark: '#4ADE80' },
    bgDefaultReverse: { light: '#082F49', dark: '#F0F9FF' },
  },
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
        <Tabs defaultValue="onchainKitDefault" className="space-y-8">
          <TabsList>
            <TabsTrigger value="onchainKitDefault">OnchainKit default</TabsTrigger>
            <TabsTrigger value="warm">Warm</TabsTrigger>
            <TabsTrigger value="nature">Nature</TabsTrigger>
            <TabsTrigger value="vibrant">Vibrant</TabsTrigger>
            <TabsTrigger value="cool">Cool</TabsTrigger>
            <TabsTrigger value="lucky">Lucky</TabsTrigger>
          </TabsList>
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