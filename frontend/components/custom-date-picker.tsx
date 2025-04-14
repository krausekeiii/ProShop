"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isAfter,
  isBefore,
  isToday,
} from "date-fns"

interface CustomDatePickerProps {
  selected?: Date
  onSelect: (date: Date) => void
  minDate?: Date
  maxDate?: Date
}

export function CustomDatePicker({ selected, onSelect, minDate, maxDate }: CustomDatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(selected)

  useEffect(() => {
    if (selected) {
      setSelectedDate(selected)
      setCurrentMonth(selected)
    }
  }, [selected])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    onSelect(date)
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const isDateDisabled = (date: Date) => {
    if (minDate && isBefore(date, minDate)) return true
    if (maxDate && isAfter(date, maxDate)) return true
    return false
  }

  // Generate days for the current month view
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const days = eachDayOfInterval({ start: startDate, end: endDate })

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevMonth}
          className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100 hover:text-masters-green"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-base font-medium text-gray-800">{format(currentMonth, "MMMM yyyy")}</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextMonth}
          className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100 hover:text-masters-green"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="mb-2 grid grid-cols-7 gap-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, currentMonth)
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false
          const isDisabled = isDateDisabled(day)
          const isDayToday = isToday(day)

          return (
            <Button
              key={i}
              variant="ghost"
              size="sm"
              className={cn(
                "h-9 w-9 rounded-full p-0 font-normal",
                !isCurrentMonth && "text-gray-300",
                isCurrentMonth && !isSelected && !isDayToday && "text-gray-700 hover:bg-gray-100",
                isDayToday && !isSelected && "border border-masters-green text-masters-green",
                isSelected && "bg-masters-green text-white hover:bg-masters-green/90",
                isDisabled && "pointer-events-none opacity-30",
              )}
              disabled={isDisabled}
              onClick={() => handleDateSelect(day)}
            >
              {format(day, "d")}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
