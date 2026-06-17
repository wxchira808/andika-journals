const toggle = document.querySelector("[data-menu-toggle]");
const panel = document.querySelector("[data-mobile-panel]");

if (toggle && panel) {
  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-order-link]").forEach((link) => {
  link.addEventListener("click", () => {
    sessionStorage.setItem("andikaOrderType", link.getAttribute("data-order-link"));
  });
});

const orderForm = document.getElementById("orderForm");
const paymentPanel = document.getElementById("paymentPanel");
const formStatus = document.getElementById("formStatus");
const journalSelect = document.querySelector("[name='journal_type']");

if (journalSelect) {
  const savedType = sessionStorage.getItem("andikaOrderType");
  if (savedType) {
    journalSelect.value = savedType;
  }
}

if (orderForm && paymentPanel && formStatus) {
  orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!orderForm.checkValidity()) {
      orderForm.reportValidity();
      return;
    }

    const endpoint = orderForm.getAttribute("action");
    const isDemoEndpoint = endpoint.includes("YOUR_FORM_ID");
    const formData = new FormData(orderForm);

    formStatus.textContent = "Submitting your order...";

    try {
      if (!isDemoEndpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" }
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }
      }

      paymentPanel.classList.add("show");
      formStatus.textContent = "Your order has been received. Payment instructions are above. We'll contact you via WhatsApp or phone once we confirm payment.";
      orderForm.reset();
      paymentPanel.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (error) {
      paymentPanel.classList.add("show");
      formStatus.textContent = "Your order is ready. Please use the payment instructions above, then contact us on WhatsApp to confirm.";
    }
  });
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
