"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Clock, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import * as z from "zod"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CustomDatePicker } from "./custom-date-picker"
import { motion } from "framer-motion"

const formSchema = z.object({
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string({
    required_error: "Please select a time.",
  }),
  location: z.string({
    required_error: "Please enter a location.",
  }),
})

export default function SearchForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      location: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Format the date and time for the URL
    const formattedDate = format(values.date, "yyyy-MM-dd")
    const encodedLocation = encodeURIComponent(values.location)

    // Redirect to results page with search parameters
    router.push(`/results?date=${formattedDate}&time=${values.time}&location=${encodedLocation}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2 text-sm font-medium text-gray-700">When</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start rounded-2xl border-0 bg-gray-100/80 pl-4 text-left font-normal shadow-none hover:bg-gray-200/80",
                          !field.value && "text-gray-400",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-masters-green" />
                        {field.value ? format(field.value, "EEEE, MMM d") : <span>Select date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto rounded-2xl border-0 bg-white/80 p-0 shadow-xl backdrop-blur-xl"
                    align="start"
                  >
                    <CustomDatePicker selected={field.value} onSelect={field.onChange} minDate={new Date()} />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 text-sm font-medium text-gray-700">Time</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="rounded-2xl border-0 bg-gray-100/80 shadow-none hover:bg-gray-200/80">
                      <SelectValue placeholder="Select a time">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-masters-green" />
                          <span>
                            {field.value
                              ? `${field.value.replace(/^(\d+):00$/, (_, h) => {
                                  const hour = Number.parseInt(h)
                                  return `${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`
                                })}`
                              : "Select time"}
                          </span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-2xl border-0 bg-white/80 backdrop-blur-xl">
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 text-sm font-medium text-gray-700">Where</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3 h-4 w-4 text-masters-green" />
                    <Input
                      placeholder="City, ZIP code, or 'Use my location'"
                      className="rounded-2xl border-0 bg-gray-100/80 pl-10 shadow-none hover:bg-gray-200/80 focus:ring-0"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            className="w-full rounded-full bg-masters-green py-6 text-base font-medium text-white shadow-md transition-all hover:bg-masters-green/90 hover:shadow-lg"
            disabled={isSubmitting}
          >
            <Search className="mr-2 h-4 w-4" />
            Find Tee Times
          </Button>
        </motion.div>
      </form>
    </Form>
  )
}
