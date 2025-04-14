"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, CreditCard, Calendar, Check, Apple, ChevronRight } from "lucide-react"
import { AuthModal } from "./auth-modal"
import { motion } from "framer-motion"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  courseInfo: {
    name: string
    teeTime: string
    date: string
    price: string
    players?: number
  }
}

export function BookingModal({ isOpen, onClose, courseInfo }: BookingModalProps) {
  const [activeTab, setActiveTab] = useState("guest")
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState(1)
  const [bookingComplete, setBookingComplete] = useState(false)

  // Guest booking form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [formError, setFormError] = useState("")

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")

    if (bookingStep === 1) {
      // Validate contact info
      if (!firstName || !lastName || !email || !phone) {
        setFormError("Please fill in all required fields")
        return
      }
      setBookingStep(2)
    } else if (bookingStep === 2) {
      // Validate payment info
      if (!cardNumber || !expiry || !cvc) {
        setFormError("Please fill in all required fields")
        return
      }

      // Process booking
      console.log("Guest booking:", {
        courseInfo,
        guestInfo: {
          firstName,
          lastName,
          email,
          phone,
        },
      })

      // Show success state
      setBookingComplete(true)

      // Close after 3 seconds
      setTimeout(() => {
        onClose()
        setBookingStep(1)
        setBookingComplete(false)
      }, 3000)
    }
  }

  const openAuthModal = () => {
    onClose() // Close booking modal
    setIsAuthModalOpen(true) // Open auth modal
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="rounded-3xl border-0 bg-white/80 p-0 shadow-2xl backdrop-blur-xl sm:max-w-[500px]">
          {bookingComplete ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-masters-green/10">
                <Check className="h-10 w-10 text-masters-green" />
              </div>
              <DialogTitle className="mb-2 text-2xl font-semibold text-gray-900">Booking Confirmed!</DialogTitle>
              <DialogDescription className="mb-6 text-gray-500">
                Your tee time has been booked successfully. A confirmation email has been sent to {email}.
              </DialogDescription>
              <div className="mb-6 w-full overflow-hidden rounded-2xl bg-masters-green/10 p-0.5">
                <div className="rounded-[15px] bg-white/50 p-4 backdrop-blur-sm">
                  <h3 className="font-medium text-masters-green">{courseInfo.name}</h3>
                  <div className="mt-1 flex items-center justify-center gap-3 text-sm text-masters-green">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {courseInfo.date}
                    </div>
                    <div>{courseInfo.teeTime}</div>
                    <div className="font-medium">{courseInfo.price}</div>
                  </div>
                </div>
              </div>
              <Button className="rounded-full bg-masters-green text-white hover:bg-masters-green/90" onClick={onClose}>
                Done
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="guest" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-t-3xl bg-gray-50/80 p-1 backdrop-blur-sm">
                <TabsTrigger
                  value="guest"
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:text-masters-green data-[state=active]:shadow-sm"
                >
                  Book as Guest
                </TabsTrigger>
                <TabsTrigger
                  value="account"
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:text-masters-green data-[state=active]:shadow-sm"
                >
                  Book with Account
                </TabsTrigger>
              </TabsList>

              <TabsContent value="guest" className="p-6">
                <form onSubmit={handleNextStep}>
                  <DialogHeader className="mb-6">
                    <DialogTitle className="text-2xl font-semibold text-gray-900">Book Your Tee Time</DialogTitle>
                    <DialogDescription className="text-gray-500">
                      {bookingStep === 1
                        ? "Book as a guest without creating an account. Fill in your contact details."
                        : "Please provide your payment information to complete the booking."}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mb-6 overflow-hidden rounded-2xl bg-masters-green/10 p-0.5">
                    <div className="rounded-[15px] bg-white/50 p-4 backdrop-blur-sm">
                      <h3 className="font-medium text-masters-green">{courseInfo.name}</h3>
                      <div className="mt-1 flex items-center gap-3 text-sm text-masters-green">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {courseInfo.date}
                        </div>
                        <div>{courseInfo.teeTime}</div>
                        <div className="font-medium">{courseInfo.price}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 flex">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            bookingStep >= 1 ? "bg-masters-green text-white" : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          1
                        </div>
                        <span className="ml-2 text-sm font-medium">Contact Info</span>
                      </div>
                      <div className="h-0.5 w-16 bg-gray-200"></div>
                      <div className="flex items-center">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            bookingStep >= 2 ? "bg-masters-green text-white" : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          2
                        </div>
                        <span className="ml-2 text-sm font-medium">Payment</span>
                      </div>
                    </div>
                  </div>

                  {bookingStep === 1 ? (
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="first-name" className="text-sm font-medium text-gray-700">
                            First Name *
                          </Label>
                          <Input
                            id="first-name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="rounded-full border-gray-200 bg-gray-50/50"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="last-name" className="text-sm font-medium text-gray-700">
                            Last Name *
                          </Label>
                          <Input
                            id="last-name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="rounded-full border-gray-200 bg-gray-50/50"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email *
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="email"
                              type="email"
                              className="rounded-full border-gray-200 bg-gray-50/50 pl-9"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                            Phone *
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="phone"
                              type="tel"
                              className="rounded-full border-gray-200 bg-gray-50/50 pl-9"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4 py-4">
                      <div className="mb-4">
                        <Button
                          type="button"
                          className="w-full rounded-full bg-black py-5 text-white hover:bg-black/90"
                        >
                          <Apple className="mr-2 h-5 w-5" />
                          Pay with Apple Pay
                        </Button>
                      </div>

                      <div className="relative mb-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="bg-white px-2 text-gray-500">or pay with card</span>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="card-number" className="text-sm font-medium text-gray-700">
                          Card Number *
                        </Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="card-number"
                            placeholder="•••• •••• •••• ••••"
                            className="rounded-full border-gray-200 bg-gray-50/50 pl-9"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expiry" className="text-sm font-medium text-gray-700">
                            Expiry Date *
                          </Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            className="rounded-full border-gray-200 bg-gray-50/50"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cvc" className="text-sm font-medium text-gray-700">
                            CVC *
                          </Label>
                          <Input
                            id="cvc"
                            placeholder="•••"
                            className="rounded-full border-gray-200 bg-gray-50/50"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {formError && <p className="text-sm text-masters-red">{formError}</p>}

                  <DialogFooter className="mt-6 flex-col gap-2 sm:flex-row">
                    {bookingStep === 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full rounded-full border-gray-200 sm:w-auto"
                        onClick={() => setBookingStep(1)}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full rounded-full border-gray-200 sm:w-auto"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="w-full rounded-full bg-masters-green text-white hover:bg-masters-green/90 sm:w-auto"
                      >
                        {bookingStep === 1 ? (
                          <>
                            Continue to Payment
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </>
                        ) : (
                          "Complete Booking"
                        )}
                      </Button>
                    </motion.div>
                  </DialogFooter>

                  {bookingStep === 1 && (
                    <div className="mt-6 text-center text-sm text-gray-500">
                      <p>
                        Want to save your details for next time?{" "}
                        <button type="button" className="text-masters-green hover:underline" onClick={openAuthModal}>
                          Create an account
                        </button>
                      </p>
                    </div>
                  )}
                </form>
              </TabsContent>

              <TabsContent value="account" className="p-6">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-2xl font-semibold text-gray-900">Sign in to Book</DialogTitle>
                  <DialogDescription className="text-gray-500">
                    Sign in to your account to book this tee time and access your booking history.
                  </DialogDescription>
                </DialogHeader>

                <div className="mb-6 overflow-hidden rounded-2xl bg-masters-green/10 p-0.5">
                  <div className="rounded-[15px] bg-white/50 p-4 backdrop-blur-sm">
                    <h3 className="font-medium text-masters-green">{courseInfo.name}</h3>
                    <div className="mt-1 flex items-center gap-3 text-sm text-masters-green">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {courseInfo.date}
                      </div>
                      <div>{courseInfo.teeTime}</div>
                      <div className="font-medium">{courseInfo.price}</div>
                    </div>
                  </div>
                </div>

                <div className="py-8 text-center">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={openAuthModal}
                      className="rounded-full bg-masters-green px-8 py-6 text-white hover:bg-masters-green/90"
                    >
                      Sign In to Continue
                    </Button>
                  </motion.div>
                </div>

                <div className="text-center text-sm text-gray-500">
                  <button
                    type="button"
                    className="text-masters-green hover:underline"
                    onClick={() => setActiveTab("guest")}
                  >
                    Continue as guest instead
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
