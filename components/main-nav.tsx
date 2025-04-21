"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { QuizWhizLogo } from "@/components/quiz-whiz-logo"
import { Trophy, Home, BookOpen, User, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/i18n/language-context"
import { useMobile } from "@/hooks/use-mobile"

export function MainNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()
  const isMobile = useMobile()

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Close mobile menu when screen size changes from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false)
    }
  }, [isMobile])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileMenuOpen])

  const navItems = [
    { name: t.nav.home, href: "/", icon: Home },
    { name: t.nav.categories, href: "/quiz-categories", icon: BookOpen },
    { name: t.nav.leaderboard, href: "/leaderboard", icon: Trophy },
    { name: t.nav.profile, href: "/profile", icon: User },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <QuizWhizLogo className="w-8 h-8" />
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent hidden sm:inline-block">
              {t.common.appName}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-1 text-sm font-medium transition-all duration-300 hover:text-purple-600 dark:hover:text-purple-400 relative group ${
                  isActive ? "text-purple-600 dark:text-purple-400" : "text-gray-600 dark:text-gray-300"
                }`}
              >
                <item.icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-125" />
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ModeToggle />
          <Button
            variant="default"
            size="sm"
            className="hidden md:flex bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            {t.common.signIn}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden transition-transform duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 animate-fade-in" /> : <Menu className="h-5 w-5 animate-fade-in" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-white dark:bg-gray-950 animate-fade-in overflow-auto">
          <nav className="container flex flex-col space-y-4 py-6">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-3 rounded-md text-base font-medium transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 ${
                    isActive
                      ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}
            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
              <Button
                variant="default"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              >
                {t.common.signIn}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
