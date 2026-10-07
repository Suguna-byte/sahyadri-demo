"use server";

/**
 * Server Action for the enquiry form. Runs only on the server, so
 * validation can't be bypassed and no API secrets ever reach the browser.
 * The client form works without JavaScript too (progressive enhancement):
 * <form action={...}> posts natively if JS hasn't loaded.
 */

export type ContactState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Partial<Record<"name" | "phone" | "email" | "type" | "message", string>>;
  values?: Record<string, string>;
};

const PHONE = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitEnquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const values = {
    name: get("name"),
    phone: get("phone"),
    email: get("email"),
    type: get("type"),
    budget: get("budget"),
    location: get("location"),
    message: get("message"),
  };

  // Honeypot: real users never see or fill this field.
  if (get("company_website")) return { status: "success", message: "Thanks!" };

  const errors: ContactState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (!PHONE.test(values.phone.replace(/\s/g, ""))) errors.phone = "Enter a valid 10-digit Indian mobile number.";
  if (values.email && !EMAIL.test(values.email)) errors.email = "That email doesn't look right.";
  if (!values.type) errors.type = "Choose a project type.";
  if (values.message.length < 10) errors.message = "A sentence or two about the project helps us prepare.";

  if (Object.keys(errors).length) {
    return { status: "error", errors, values, message: "Please fix the highlighted fields." };
  }

  // Integrate here: send to CRM (e.g. Zoho / HubSpot), email via Resend, or a Slack webhook.
  await new Promise((r) => setTimeout(r, 600));

  return { status: "success", message: `Thanks, ${values.name.split(" ")[0]}. A senior engineer will call you within one working day.` };
}
