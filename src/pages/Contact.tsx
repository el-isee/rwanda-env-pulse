import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container pt-24 pb-16 max-w-xl space-y-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Contact Us</h1>
        <p className="text-muted-foreground">Have questions or feedback? We'd love to hear from you.</p>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input placeholder="Your name" className="rounded-xl" />
          <Input type="email" placeholder="Your email" className="rounded-xl" />
          <Textarea placeholder="Your message" className="rounded-xl min-h-[120px]" />
          <Button type="submit" className="rounded-xl w-full">Send Message</Button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
