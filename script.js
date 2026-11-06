
const SUPABASE_URL = "https://hznsnholbufsmiffwaup.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_lrngNnT1OYhoXGNzLtzaIA_TAUBjjcC";

const feedbackClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

// Connect the existing YOUR INPUT form
window.demoFeedback = async function (event) {
  event.preventDefault();

  const category = document.getElementById("feedbackType").value;
  const message = document.getElementById("feedbackMessage").value.trim();
  const status = document.getElementById("feedbackStatus");
  const button = event.target.querySelector('button[type="submit"]');

  if (!category || message.length < 5 || message.length > 2000) {
    status.textContent = "Please enter a message between 5 and 2000 characters.";
    status.style.color = "#d78b8b";
    return;
  }

  button.disabled = true;
  button.textContent = "SENDING...";

  status.textContent = "Submitting your feedback...";
  status.style.color = "#aaa";

  try {
    const { error } = await feedbackClient
      .from("feedback")
      .insert([{ category, message }]);

    if (error) throw error;

    event.target.reset();

    status.textContent = "Your feedback has been received. Thank you!";
    status.style.color = "#8bc99b";

  } catch (error) {
    console.error("Feedback submission error:", error);

    status.textContent =
      "Something went wrong. Please try again later.";

    status.style.color = "#d78b8b";

  } finally {
    button.disabled = false;
    button.textContent = "SUBMIT FEEDBACK";
  }
};
