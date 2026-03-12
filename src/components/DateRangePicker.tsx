import { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface DateRangePickerProps {
  from: Date | null
  to: Date | null
  onChange: (range: { from: Date | null; to: Date | null }) => void
}

export function DateRangePicker({ from, to, onChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (range: { from?: Date; to?: Date } | undefined) => {
    onChange({
      from: range?.from ?? null,
      to: range?.to ?? null,
    })
    if (range?.from && range?.to) {
      setOpen(false)
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange({ from: null, to: null })
  }

  const label =
    from && to
      ? `${format(from, 'dd/MM/yyyy', { locale: es })} - ${format(to, 'dd/MM/yyyy', { locale: es })}`
      : 'Filtrar por fecha'

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-64 justify-start gap-2">
          <CalendarIcon className="h-4 w-4" />
          <span className={from && to ? '' : 'text-muted-foreground'}>{label}</span>
          {from && to && (
            <X
              className="ml-auto h-4 w-4 text-muted-foreground hover:text-foreground"
              onClick={handleClear}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={{ from: from ?? undefined, to: to ?? undefined }}
          onSelect={handleSelect}
          locale={es}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}
