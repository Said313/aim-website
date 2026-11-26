import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import logo from "@/assets/aim-logo.png";

const pages = {
  support: {
    title: "Aim Feedback support",
    description: "Get help using Aim Feedback in ChatGPT.",
  },
  privacy: {
    title: "Aim Feedback privacy policy",
    description: "How Aim Feedback handles reports, screenshots, and account information.",
  },
  terms: {
    title: "Aim Feedback terms of use",
    description: "Terms for reporting bugs and suggestions with Aim Feedback.",
  },
} as const;

type Page = keyof typeof pages;

const supportEmail = "sabyrov.saidgaffor@gmail.com";
const reportRetention = "for 30 days from submission";
const screenshotRetention = "for 30 days from upload";

export const Route = createFileRoute("/aim-feedback/$page")({
  beforeLoad: ({ params }) => {
    if (!Object.hasOwn(pages, params.page)) throw notFound();
    return { feedbackPage: params.page as Page };
  },
  head: ({ match }) => {
    const page = match.context.feedbackPage;
    return {
      meta: [
        { title: pages[page].title },
        { name: "description", content: pages[page].description },
      ],
      links: [{ rel: "canonical", href: `https://theaim.app/aim-feedback/${page}/` }],
    };
  },
  component: FeedbackInfo,
});

function FeedbackInfo() {
  const { feedbackPage } = Route.useRouteContext();
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12 sm:py-20">
      <Link
        to="/$lang"
        params={{ lang: "en" }}
        className="inline-flex items-center gap-2 font-semibold"
      >
        <img src={logo} alt="" width="30" height="30" />
        Aim
      </Link>
      <h1 className="mt-10 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        {pages[feedbackPage].title}
      </h1>
      <div className="mt-7 space-y-5 leading-7 text-muted-foreground [&_a]:text-accent [&_a]:underline [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground">
        {feedbackPage === "support" && <Support />}
        {feedbackPage === "privacy" && <Privacy />}
        {feedbackPage === "terms" && <Terms />}
      </div>
    </main>
  );
}

function Support() {
  return (
    <>
      <p>
        Aim Feedback helps invited Aim iPhone testers report bugs, suggest improvements, and check
        previous feedback from ChatGPT.
      </p>
      <p>
        If you cannot connect, open the{" "}
        <a href="https://aim-feedback.sabyrov-saidgaffor.chatgpt.site/connect">
          Aim Feedback sign-in check
        </a>{" "}
        and choose the ChatGPT account that received your invitation.
      </p>
      <p>
        For help with Aim Feedback or a report you submitted, contact <SupportContact />. Include
        the issue number if you have one. Keep bank details, balances, credentials, and other
        personal information out of your message.
      </p>
    </>
  );
}

function Privacy() {
  return (
    <>
      <p>
        This policy explains how Aim handles information used by the Aim Feedback plugin for
        ChatGPT.
      </p>
      <h2>Account information</h2>
      <p>
        Aim Feedback uses your ChatGPT account email and a site-specific account identifier to check
        your invitation and authorize the connection.
      </p>
      <h2>Reports and screenshots</h2>
      <p>
        When you approve a report, its text and labels go to Aim’s private GitHub repository so Aim
        can investigate and track feedback. Aim Feedback retrieves the files you approve from
        ChatGPT and stores them on its hosted Site. The GitHub issue contains links that approved
        Aim Feedback accounts can open.
      </p>
      <p>
        Crop or redact private information before attaching an image. Aim Feedback’s reviewer demo
        stores sample reports and attachments separately from the production issue tracker.
      </p>
      <h2>Retention and requests</h2>
      <p>
        Aim retains submitted reports {reportRetention} and screenshots {screenshotRetention}. To
        request access to or removal of your feedback, contact <SupportContact />.
      </p>
    </>
  );
}

function Terms() {
  return (
    <>
      <p>
        Use Aim Feedback to report bugs, suggest improvements, and check the status of feedback for
        the Aim iPhone app.
      </p>
      <p>
        Connect using the ChatGPT account that Aim invited. Review the report and attachments before
        approving submission. Share only content you have permission to share. Remove bank details,
        balances, account credentials, and other people’s information before sending screenshots or
        text.
      </p>
      <p>
        For questions about Aim Feedback, contact <SupportContact />.
      </p>
    </>
  );
}

function SupportContact() {
  return <a href={`mailto:${supportEmail}`}>{supportEmail}</a>;
}
