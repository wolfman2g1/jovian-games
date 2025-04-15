"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const categories = [
  { id: "minecraft", label: "Minecraft" },
  { id: "csgo", label: "CS:GO" },
  { id: "valheim", label: "Valheim" },
  { id: "ark", label: "ARK: Survival Evolved" },
  { id: "rust", label: "Rust" },
  { id: "terraria", label: "Terraria" },
]

const regions = [
  { id: "us-east", label: "US East" },
  { id: "us-west", label: "US West" },
  { id: "eu-west", label: "EU West" },
  { id: "eu-central", label: "EU Central" },
  { id: "asia-pacific", label: "Asia Pacific" },
]

export function GameFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])

  const handleCategoryChange = (id: string, checked: boolean) => {
    setSelectedCategories(checked ? [...selectedCategories, id] : selectedCategories.filter((c) => c !== id))
  }

  const handleRegionChange = (id: string, checked: boolean) => {
    setSelectedRegions(checked ? [...selectedRegions, id] : selectedRegions.filter((r) => r !== id))
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams)

    // Update price range
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    // Update categories
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","))
    } else {
      params.delete("categories")
    }

    // Update regions
    if (selectedRegions.length > 0) {
      params.set("regions", selectedRegions.join(","))
    } else {
      params.delete("regions")
    }

    router.push(`/store?${params.toString()}`)
  }

  const resetFilters = () => {
    setPriceRange([0, 100])
    setSelectedCategories([])
    setSelectedRegions([])
    router.push("/store")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium">Filters</h3>
        <Accordion type="multiple" defaultValue={["price", "category", "region"]}>
          <AccordionItem value="price">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <Slider value={priceRange} min={0} max={100} step={1} onValueChange={setPriceRange} />
                <div className="flex items-center justify-between">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="category">
            <AccordionTrigger>Game Type</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => handleCategoryChange(category.id, checked === true)}
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="region">
            <AccordionTrigger>Region</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {regions.map((region) => (
                  <div key={region.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`region-${region.id}`}
                      checked={selectedRegions.includes(region.id)}
                      onCheckedChange={(checked) => handleRegionChange(region.id, checked === true)}
                    />
                    <label
                      htmlFor={`region-${region.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {region.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={applyFilters} className="w-full">
          Apply Filters
        </Button>
        <Button onClick={resetFilters} variant="outline" className="w-full">
          Reset
        </Button>
      </div>
    </div>
  )
}
