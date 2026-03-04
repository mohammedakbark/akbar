"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import { useState } from "react";

/**
 * Contact Section Component
 * - Clean contact form with validation
 * - Social media links and contact information
 * - Animated form with success feedback
 */
export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "makbarkozhikkal@gmail.com",
      href: "mailto:makbarkozhikkal@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9846475854",
      href: "tel:+919846475854",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Malappuram, Kerala, India",
      href: "#",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full py-20 px-4 flex items-center justify-center overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      {/* Animated floating blob */}
      <motion.div
        className="absolute bottom-0 left-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl transform -translate-x-1/2"
        animate={{
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-5xl w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium border border-accent/30 text-accent bg-accent/10 mb-4">
              Get in Touch
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Let&apos;s Work
            <br />
            <span className="text-gradient">Together</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Have an exciting project or opportunity? I&apos;d love to hear from
            you. Let&apos;s connect and create something amazing together.
          </motion.p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-1"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-8">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={index}
                      href={info.href}
                      variants={itemVariants}
                      className="flex items-start gap-4 group cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-all duration-300">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {info.label}
                        </p>
                        <p className="font-semibold group-hover:text-accent transition-colors duration-300">
                          {info.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="mt-10">
                <p className="text-sm text-muted-foreground mb-4">
                  Follow me on social media
                </p>
                <div className="flex gap-4">
                  <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-5 h-5 text-accent" />
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-5 h-5 text-accent" />
                  </motion.a>

                  <motion.a
                    href="mailto:makbarkozhikkal@gmail.com"
                    className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-5 h-5 text-accent" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.form
              onSubmit={handleSubmit}
              variants={itemVariants}
              className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-accent/30 transition-all duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent/50 transition-colors duration-300"
                    required
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold mb-3">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent/50 transition-colors duration-300"
                    required
                  />
                </motion.div>
              </div>

              {/* Subject Field */}
              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-sm font-semibold mb-3">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Project Discussion"
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent/50 transition-colors duration-300"
                  required
                />
              </motion.div>

              {/* Message Field */}
              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-sm font-semibold mb-3">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message here..."
                  rows={5}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent/50 transition-colors duration-300 resize-none"
                  required
                />
              </motion.div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm"
                >
                  ✓ Message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                >
                  ✗ Error sending message. Please try again.
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-lg bg-accent text-background font-semibold hover:bg-accent-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-background border-t-accent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, linear: true }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
