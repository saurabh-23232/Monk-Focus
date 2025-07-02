"use client"

import type React from "react"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import {
  Clock,
  Target,
  Zap,
  Shield,
  BarChart3,
  Calendar,
  Timer,
  Rocket,
  User,
  Star,
  CheckCircle,
  Brain,
  Sparkles,
} from "lucide-react"

const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 1, -1, 0],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

const GlowCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
      <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl">{children}</div>
    </motion.div>
  )
}

const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function MonkFocusLanding() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Smart Pomodoro Timer",
      description: "Custom durations tailored to your focus rhythm",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Auto Break Support",
      description: "Intelligent break scheduling for optimal productivity",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Streak Tracker",
      description: "Build momentum with visual progress tracking",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Focus Mode To-Do",
      description: "Distraction-free task management",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Website Blocker",
      description: "Block distracting sites during focus sessions",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Visual insights into your productivity patterns",
    },
  ]

  const productivityMethods = [
    {
      icon: <Timer className="w-12 h-12" />,
      name: "The 2-Minute Rule",
      description: "If it takes less than 2 minutes, do it now.",
    },
    {
      icon: <Rocket className="w-12 h-12" />,
      name: "The 52/17 Rule",
      description: "Work for 52 minutes, break for 17 minutes.",
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      name: "Timeboxing",
      description: "Allocate fixed time periods for specific tasks.",
    },
    {
      icon: <User className="w-12 h-12" />,
      name: "The Marathon Method",
      description: "Sustainable long-term productivity approach.",
    },
  ]

  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
        <motion.div className="absolute inset-0 opacity-30" style={{ y }}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        </motion.div>
      </div>

      {/* Hero Section */}
      <motion.section className="relative z-10 min-h-screen flex items-center justify-center px-4" style={{ opacity }}>
        <div className="max-w-6xl mx-auto text-center">
          <FloatingElement>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
                  <Brain className="w-16 h-16 text-white" />
                </div>
              </div>
            </motion.div>
          </FloatingElement>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Master Your Time
            <br />
            <span className="text-5xl md:text-7xl">Like a Monk</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Monk Focus helps you sharpen your mind, track your time, and embrace modern productivity rituals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-full shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <a
                href="https://chromewebstore.google.com/detail/monk-focus/dgckhghgnhikghhnlbakchgmbhobblop"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                Install Extension
              </a>
            </Button>
          </motion.div>

          <FloatingElement delay={2}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1.5 }}
              className="mt-16"
            >
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative w-full h-full bg-gray-900/50 backdrop-blur-xl rounded-full border border-gray-700/50 flex items-center justify-center">
                  {/* Digital Clock Display */}
                  <motion.div
                    className="text-center"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="text-sm text-cyan-400 mb-2 font-medium">TIME REMAINING TODAY</div>
                    <motion.div
                      className="text-4xl md:text-5xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    >
                      {(() => {
                        const now = currentTime
                        const endOfDay = new Date(now)
                        endOfDay.setHours(23, 59, 59, 999)
                        const remaining = endOfDay.getTime() - now.getTime()

                        const hours = Math.floor(remaining / (1000 * 60 * 60))
                        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
                        const seconds = Math.floor((remaining % (1000 * 60)) / 1000)

                        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
                      })()}
                    </motion.div>
                    <div className="text-xs text-gray-400 mt-2">HOURS : MINUTES : SECONDS</div>
                  </motion.div>

                  {/* Animated border rings */}
                  <motion.div
                    className="absolute inset-8 border border-cyan-400/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-12 border border-purple-400/20 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 45, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-16 border border-pink-400/10 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                </div>
              </div>
            </motion.div>
          </FloatingElement>
        </div>
      </motion.section>

      {/* Features Section */}
      <AnimatedSection className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Futuristic Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced productivity tools designed for the modern digital monk
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 },
                }}
              >
                <GlowCard className="h-full">
                  <CardContent className="p-8 text-center h-full flex flex-col">
                    <motion.div
                      className="mb-6 text-cyan-400"
                      whileHover={{
                        scale: 1.2,
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <motion.h3
                      className="text-xl font-bold mb-4 text-white"
                      whileHover={{
                        color: "#22d3ee",
                        transition: { duration: 0.2 },
                      }}
                    >
                      {feature.title}
                    </motion.h3>
                    <p className="text-gray-300 flex-grow">{feature.description}</p>
                  </CardContent>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Productive Mindset Section */}
      <AnimatedSection className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ancient Wisdom,
              <br />
              Modern Practice
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Productivity theories integrated into your digital meditation practice
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productivityMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <GlowCard className="h-full">
                  <CardContent className="p-8 text-center h-full flex flex-col">
                    <div className="mb-6 text-purple-400 mx-auto">{method.icon}</div>
                    <h3 className="text-xl font-bold mb-4 text-white">{method.name}</h3>
                    <p className="text-gray-300 flex-grow">{method.description}</p>
                  </CardContent>
                </GlowCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <a
                href="https://chromewebstore.google.com/detail/monk-focus/dgckhghgnhikghhnlbakchgmbhobblop"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Brain className="w-5 h-5 mr-2" />
                Discover More Practices in Extension
              </a>
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Testimonials & Reviews Section */}
      <AnimatedSection className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Loved by Digital Monks
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of users who have transformed their productivity
            </p>
          </motion.div>

          {/* Star Rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex justify-center items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                >
                  <Star className="w-8 h-8 text-yellow-400 fill-current" />
                </motion.div>
              ))}
            </div>
            <p className="text-2xl font-bold text-white">4.9/5 Stars</p>
            <p className="text-gray-400">Based on 2,847+ Chrome Web Store reviews</p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Software Engineer",
                avatar: "/placeholder.svg?height=60&width=60",
                rating: 5,
                text: "Monk Focus completely transformed my coding sessions. The Pomodoro timer with ambient sounds keeps me in the zone for hours!",
                verified: true,
              },
              {
                name: "Marcus Rodriguez",
                role: "Digital Designer",
                avatar: "/placeholder.svg?height=60&width=60",
                rating: 5,
                text: "The website blocker feature is a game-changer. I can finally focus without getting distracted by social media.",
                verified: true,
              },
              {
                name: "Emily Watson",
                role: "Content Writer",
                avatar: "/placeholder.svg?height=60&width=60",
                rating: 5,
                text: "Love the zen mode! The minimalist interface and productivity quotes keep me motivated throughout the day.",
                verified: true,
              },
              {
                name: "David Kim",
                role: "Product Manager",
                avatar: "/placeholder.svg?height=60&width=60",
                rating: 5,
                text: "The analytics dashboard shows exactly where my time goes. It's like having a personal productivity coach!",
                verified: true,
              },
              {
                name: "Lisa Thompson",
                role: "Freelancer",
                avatar: "/placeholder.svg?height=60&width=60",
                rating: 5,
                text: "Best productivity extension I've ever used. The streak tracker keeps me motivated to maintain my focus habits.",
                verified: true,
              },
              {
                name: "Alex Johnson",
                role: "Student",
                avatar: "/placeholder.svg?height=60&width=60",
                rating: 5,
                text: "Perfect for study sessions! The break reminders and focus music help me study for hours without burning out.",
                verified: true,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlowCard className="h-full">
                  <CardContent className="p-6">
                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>

                    {/* User Info */}
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full border-2 border-cyan-400/30"
                        />
                        {testimonial.verified && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{testimonial.name}</p>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </GlowCard>
              </motion.div>
            ))}
          </div>

          {/* Chrome Web Store Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-4 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-lg">Available on Chrome Web Store</p>
                <p className="text-gray-400">Free Chrome Extension</p>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Final CTA Footer */}
      <AnimatedSection className="relative z-10 py-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Start Your Monk
              <br />
              Journey Today
            </h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-16 py-8 text-2xl rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <a
                  href="https://chromewebstore.google.com/detail/monk-focus/dgckhghgnhikghhnlbakchgmbhobblop"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Star className="w-8 h-8 mr-3" />
                  Install Monk Focus Now
                </a>
              </Button>
            </motion.div>

            <FloatingElement delay={1}>
              <div className="relative w-96 h-96 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative w-full h-full bg-gray-900/30 backdrop-blur-xl rounded-full border border-gray-700/30 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Brain className="w-32 h-32 text-gradient-to-r from-cyan-400 to-purple-400" />
                  </motion.div>
                </div>
              </div>
            </FloatingElement>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            Built with <span className="text-red-500 text-xl">♥</span>
            <span className="text-gray-500">©</span> 2025 Monk Focus. Embrace the future of productivity.
          </p>
        </div>
      </footer>
    </div>
  )
}
