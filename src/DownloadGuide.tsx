import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./download-guide.css";

const installation = {
  ios: {
    name: "iOS",
    channel: "TestFlight",
    button: "Download via TestFlight",
    intro: "Install the SafeWaters test build on your iPhone, then set up your account and follow the guide.",
    steps: [
      { title: "Install TestFlight", text: <>On your iPhone, <a href="https://apps.apple.com/gb/app/testflight/id899247664">get Apple’s TestFlight app from the App Store</a>.</> },
      { title: "Open the SafeWaters invitation", text: "Tap the download button above on your iPhone and accept the invitation in TestFlight." },
      { title: "Install SafeWaters", text: "In TestFlight, tap Install next to SafeWaters. Once it finishes, open SafeWaters from your Home Screen." },
    ],
    help: "If TestFlight says the invitation is unavailable or there’s no build to install, contact us for help joining the test.",
    source: "https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/",
  },
  android: {
    name: "Android",
    button: "Download on Google Play",
    intro: "Open the Google Play link on your  phone to install SafeWaters, then follow the guide.",
  },
} as const;

type Screenshot = { file: string; caption: string; alt: string };
type GuideStep = { title: string; text: ReactNode; screenshots?: readonly Screenshot[] };

const firstOuting: GuideStep[] = [
  { title: "Setting up SafeWaters", text: <>Open SafeWaters and sign up. Check your inbox and your junk or spam folder for the confirmation email. Follow the link in the email, then return to SafeWaters and sign in.</> },
  { title: "Complete your profile and accept the safety information", text: <>Follow the onboarding steps to set up your profile, add a profile picture, and accept the usage terms in the <strong>Important safety information</strong> notice. If you request to join a club, a club administrator needs to approve your membership. If you’re a club administrator and the first person from your club to sign up, email <a href="mailto:support@safewaters.uk">support@safewaters.uk</a> to have your club admin access approved.</> },
  { title: "Choose a session type", text: <>Start a new rowing activity. Choose <strong>Club</strong> to log a club session and select your club. Club boats must be registered with the club before you can select them. You can also use your own registered equipment. Choose <strong>Personal</strong> for an independent session. Add a temporary boat just for that outing, or register your own equipment if you want to use it again.</>, screenshots: [
    { file: "session-type", caption: "Choose Club or Personal", alt: "New Activity screen showing the Club and Personal options and a club selector" },
  ] },
  { title: "Complete the outing form and review the risk", text: <>Complete the steps on the outing form, then tap <strong>Assess risk</strong>. Review the assessment and tap <strong>Create Activity</strong>.</>, screenshots: [
    { file: "return-details", caption: "Confirm your outing details", alt: "Rowing activity form showing launch details and the return duration and location" },
    { file: "session-plan", caption: "Tap Assess risk", alt: "Session Plan and Recovery plan fields above the Assess risk button" },
    { file: "risk-assessment", caption: "Review the risk and create the activity", alt: "Activity Risk Assessment screen showing the overall risk, contributing factors and Create Activity button" },
  ] },
  { title: "Start tracking and share your outing", text: <>Open the planned activity and tap <strong>Start outing</strong> when you’re ready to leave. You can tap <strong>Share</strong> to send a WaterBuddy tracking link. The person you share it with can open the link in their browser and track you once you’ve started your activity. They don’t need the app.</>, screenshots: [
    { file: "start-and-share", caption: "Start outing and Share", alt: "Planned outing overview with Start outing and Share buttons at the bottom" },
  ] },
  { title: "End the outing when you return", text: <>Tap <strong>End activity</strong> and confirm. Once the route has finished processing, you can review the completed activity to see your route and stats. If SafeWaters reopens with an outing still running, choose <strong>Resume Activity</strong> or <strong>End Activity</strong>. Keep SafeWaters running so it can track you, even when it’s in the background. Don’t force-close the app during an activity.</> },
];

const conditionsScreenshots: Screenshot[] = [
  { file: "risk-graph", caption: "Risk Dashboard and daily risk graph", alt: "Risk Dashboard with the daily risk graph, daylight markers and warnings for the selected location" },
  { file: "forecast", caption: "Hourly and marine forecasts", alt: "Forecast screen showing the hourly forecast and the Marine Forecast tab" },
  { file: "tide-table", caption: "Tide Table and predicted heights", alt: "Tide Table showing high and low tide times and a chart of predicted tide heights" },
];

function GuideScreenshots({ screenshots }: { screenshots: readonly Screenshot[] }) {
  return <div className="guide-screenshots">{screenshots.map(({ file, caption, alt }) => {
    const src = `/screenshots/download-guide/${file}.jpg`;
    return <figure key={file}>
      <a href={src} aria-label={`View full-size screenshot: ${caption}`}><img src={src} alt={alt} width={588} height={1280} loading="lazy" decoding="async" /></a>
      <figcaption>{caption}</figcaption>
    </figure>;
  })}</div>;
}

function GuideSteps({ steps }: { steps: readonly GuideStep[] }) {
  return <ol className="guide-steps" role="list">{steps.map(step => (
    <li key={step.title}>
      <h3>{step.title}</h3><p>{step.text}</p>
      {step.screenshots && <GuideScreenshots screenshots={step.screenshots} />}
    </li>
  ))}</ol>;
}

export default function DownloadGuide({ platform, downloadUrl, icon }: {
  platform: keyof typeof installation;
  downloadUrl: string;
  icon: ReactNode;
}) {
  const guide = installation[platform];
  const iosGuide = platform === "ios" ? installation.ios : null;
  const otherPlatform = platform === "ios" ? "android" : "ios";

  return <>
    <section className="guide-hero" aria-labelledby="guide-title">
      <div className="container guide-container">
        <Link className="guide-home" to="/">← Back to SafeWaters</Link>
        <p className="guide-eyebrow">SAFEWATERS TEST BUILD</p>
        <h1 id="guide-title">Download and use SafeWaters on {guide.name}</h1>
        <p className="guide-lead">{guide.intro}</p>
        <a className="button guide-download" href={downloadUrl}>{icon}{guide.button}</a>
        <p className="guide-switch">Using a different device? <Link to={`/download/${otherPlatform}`}>View the {installation[otherPlatform].name} guide</Link>.</p>
      </div>
    </section>

    <div className="container guide-container guide-body">
      <nav className="guide-jumps" aria-label="On this page">
        {iosGuide && <a href="#install">Install the app</a>}
        <a href="#first-outing">Plan your first outing</a>
        <a href="#check-conditions">Check conditions</a>
        {iosGuide && <a href="#testing-help">Get testing help</a>}
      </nav>

      {iosGuide && <section className="guide-section" aria-labelledby="install">
        <h2 id="install">Install through {iosGuide.channel}</h2>
        <GuideSteps steps={iosGuide.steps} />
        <p className="guide-reference"><a href={iosGuide.source}>{iosGuide.channel} testing help</a></p>
      </section>}

      <section className="guide-section" aria-labelledby="first-outing">
        <h2 id="first-outing">Using SafeWaters</h2>
        <p className="guide-section-intro">Follow these steps from setting up your account to reviewing your completed route.</p>
        <GuideSteps steps={firstOuting} />
        <p className="guide-note"><strong>On the water.</strong> Use SafeWaters alongside your usual safety checks and local knowledge. In an emergency, contact the emergency services directly.</p>
      </section>

      <section className="guide-section" aria-labelledby="check-conditions">
        <h2 id="check-conditions">Check conditions before you go</h2>
        <p className="guide-section-intro">Choose your location in the app. Use the <strong>Risk Dashboard</strong> to see how forecast risk changes through the day and check the warnings for a particular hour. Open <strong>Forecast</strong> for hourly weather and marine conditions, or <strong>Tide Table</strong> for predicted high and low tide times and heights.</p>
        <GuideScreenshots screenshots={conditionsScreenshots} />
      </section>

      {iosGuide && <section className="guide-section guide-help" aria-labelledby="testing-help">
        <h2 id="testing-help">Need help with the test build?</h2>
        <p>{iosGuide.help}</p>
        <p>If you spot a problem, include your phone model, app version and the steps that led to it.</p>
        <a className="text-link" href="mailto:support@safewaters.uk">Email SafeWaters support</a>
      </section>}
    </div>
  </>;
}
