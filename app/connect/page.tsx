"use client";
import "./connect.css";


import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import SplitTextAnimate from "@/components/SplitText/SplitText";
import Link from "@/components/link";
import Toast from "@/components/Toast/Toast";
import { CONTACT_INFO } from "@/constants/contact-info";
import { useState } from "react";

export default function ConnectPage() {
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    const email = CONTACT_INFO.email.general;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setIsEmailCopied(true);
      window.setTimeout(() => setIsEmailCopied(false), 1500);
    } catch {
      setIsEmailCopied(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="page contact">
        <section className="connect-hero">
          <div className="container">
            <div className="connect-col">
              <div className="connect-hero-header">
                <SplitTextAnimate delay={0.85}>
                  {/* <h1>All spaces begin with intention</h1> */}
                  <h1>Let's build what you imagine.</h1>
                </SplitTextAnimate>
              </div>
              <div className="connect-copy-year">
                <SplitTextAnimate delay={0.1}>
                  <h1>&copy;25</h1>
                </SplitTextAnimate>
              </div>
            </div >
            <div className="connect-col">
              < div className="contact-info">
                < div className="contact-info-block">
                  < SplitTextAnimate delay={0.85} >
                    <p>E-mail</p>
                    <button
                      type="button"
                      className="copy-email"
                      onClick={handleCopyEmail}
                      aria-label={`Copy email ${CONTACT_INFO.email.general}`}
                      title={isEmailCopied ? "Copied" : "Click to copy"}
                    >
                      {CONTACT_INFO.email.general}
                    </button>
                  </SplitTextAnimate >
                </div >
                <div className="contact-info-block">
                  < SplitTextAnimate delay={1.15} >
                    <p>Based in</p>
                    <p>{CONTACT_INFO.address.country}</p>
                  </SplitTextAnimate >
                </div >
                <div className="contact-info-block">
                  < SplitTextAnimate delay={1.3} >
                    <p>Social</p>
                    <a
                      href={CONTACT_INFO.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Instagram profile"
                    >
                      Instagram
                    </a>

                    <a
                      href={CONTACT_INFO.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit LinkedIn profile"
                    >
                      LinkedIn
                    </a>
                  </SplitTextAnimate >
                </div >
              </div >
            </div >
          </div >
        </section >
      </div >
      <Toast open={isEmailCopied} message="Copied" onClose={() => setIsEmailCopied(false)} />
      <ConditionalFooter />
    </>
  );
}
