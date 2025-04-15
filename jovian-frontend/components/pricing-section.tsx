import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PricingSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-emerald-500/10 px-3 py-1 text-sm text-emerald-500">Pricing</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, transparent pricing</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that's right for you and start hosting your game server today.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-3">
          <div className="flex flex-col rounded-lg border shadow-sm">
            <div className="p-6">
              <h3 className="text-2xl font-bold">Starter</h3>
              <div className="mt-4 flex items-baseline text-gray-900 dark:text-gray-50">
                <span className="text-3xl font-bold tracking-tight">$9.99</span>
                <span className="ml-1 text-xl font-semibold">/month</span>
              </div>
              <p className="mt-4 text-muted-foreground">Perfect for small communities and casual gaming.</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                  <span className="ml-3 text-sm">2GB RAM</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                  <span className="ml-3 text-sm">10 Player Slots</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                  <span className="ml-3 text-sm">50GB SSD Storage</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                  <span className="ml-3 text-sm">Basic DDoS Protection</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-1 flex-col justify-end p-6 pt-0">
              <Link href="/auth/signup?plan=starter">
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border shadow-sm bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <div className="p-6">
              <h3 className="text-2xl font-bold">Pro</h3>
              <div className="mt-4 flex items-baseline text-gray-900 dark:text-gray-50">
                <span className="text-3xl font-bold tracking-tight">$24.99</span>
                <span className="ml-1 text-xl font-semibold">/month</span>
              </div>
              <p className="mt-4 text-muted-foreground">Ideal for growing communities with moderate traffic.</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                  <span className="ml-3 text-sm">4GB RAM</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                  <span className="ml-3 text-sm">30 Player Slots</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                  <span className="ml-3 text-sm">100GB SSD Storage</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                  <span className="ml-3 text-sm">Advanced DDoS Protection</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                  <span className="ml-3 text-sm">Priority Support</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-1 flex-col justify-end p-6 pt-0">
              <Link href="/auth/signup?plan=pro">
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border shadow-sm">
            <div className="p-6">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <div className="mt-4 flex items-baseline text-gray-900 dark:text-gray-50">
                <span className="text-3xl font-bold tracking-tight">$49.99</span>
                <span className="ml-1 text-xl font-semibold">/month</span>
              </div>
              <p className="mt-4 text-muted-foreground">For large communities and professional gaming servers.</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                  <span className="ml-3 text-sm">8GB RAM</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                  <span className="ml-3 text-sm">100+ Player Slots</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                  <span className="ml-3 text-sm">250GB SSD Storage</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                  <span className="ml-3 text-sm">Enterprise DDoS Protection</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                  <span className="ml-3 text-sm">24/7 Dedicated Support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                  <span className="ml-3 text-sm">Custom Domain</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-1 flex-col justify-end p-6 pt-0">
              <Link href="/auth/signup?plan=enterprise">
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
