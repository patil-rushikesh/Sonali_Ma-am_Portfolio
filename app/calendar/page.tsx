"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

interface GoogleCalendarProps {
  className?: string
}

const GoogleCalendar = ({ className }: GoogleCalendarProps) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Card
      className={cn(
        "p-6 font-serif bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl",
        className
      )}
    >
      <div className="space-y-4">
        <h2 className="text-xl md:text-4xl font-bold text-center text-slate-800 dark:text-slate-100">
          What's Next on My Calendar
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
          Stay updated with important holidays and events at a glance
        </p>

        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-xl border border-slate-300 dark:border-slate-700 shadow-md">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
              <Loader2 className="animate-spin text-slate-500 w-8 h-8" />
            </div>
          )}
          <motion.iframe
            src="https://calendar.google.com/calendar/embed?src=parth.joshi23%40pccoepune.org&ctz=Asia%2FKolkata"
            className="w-full h-full"
            style={{ border: 0 }}
            frameBorder="0"
            scrolling="no"
            onLoad={() => setIsLoading(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>
    </Card>
  )
}

export default GoogleCalendar
