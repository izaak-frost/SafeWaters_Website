import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

const supportEmail = "support@safewaters.uk";
const deletionLink = `mailto:${supportEmail}?subject=${encodeURIComponent("SafeWaters account deletion request")}&body=${encodeURIComponent("Hello SafeWaters,\n\nPlease delete my SafeWaters account and associated personal data.\n\nRegistered email address: \n\nPlease confirm any verification needed and let me know when the request is complete.\n")}`;

function SupportLink() {
  return <a href={`mailto:${supportEmail}`}>{supportEmail}</a>;
}

function InformationPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return <section className="information-section">
    <div className="container information-layout">
      <aside className="information-sidebar">
        <span className="eyebrow">YOUR DATA, EXPLAINED</span>
        <nav className="information-nav" aria-label="Your data">
          <NavLink to="/data-safety">Data Safety <span aria-hidden="true">↗</span></NavLink>
          <NavLink to="/privacy">Privacy Policy <span aria-hidden="true">↗</span></NavLink>
          <NavLink to="/delete-account">Delete Account <span aria-hidden="true">↗</span></NavLink>
        </nav>
        <p>Need a hand with your information?<br /><SupportLink /></p>
      </aside>
      <article className="information-card">
        <p className="policy-date">Updated <time dateTime="2026-11-01">1 November 2026</time></p>
        <h1>{title}</h1>
        <p className="information-intro">{intro}</p>
        {children}
      </article>
    </div>
  </section>;
}

const dataTypes = [
  { title: "Account & profile", detail: "Your name, email address, account ID, sign-in information and profile details you provide.", purpose: "To create and manage your account, identify you to your crew and club, and provide support.", choice: "Account details are needed to sign in. Additional profile information depends on what you provide." },
  { title: "Profile photos", detail: "An image you choose to upload as your profile photo.", purpose: "To display your photo in your profile and relevant outing or club views.", choice: "Optional. You choose a photo using your device’s image picker and can replace or remove it." },
  { title: "Location & routes", detail: "Your location, including precise GPS coordinates, route points, timestamps and live outing position.", purpose: "To show your position, record your route and keep people following the outing informed.", choice: "Device permission is required. End tracking or change your device permissions to stop further location collection." },
  { title: "Outings & physical activity", detail: "Your outing plan, participation, route, duration, distance and other recorded session information.", purpose: "To plan, assess, record and review activities and share outing progress.", choice: "Collected when you use these features. Saved outing records remain after tracking ends." },
  { title: "Emergency contacts", detail: "Names, relationships and phone numbers you enter for your emergency contacts.", purpose: "To keep the emergency-contact information you provide available within the service.", choice: "Optional. Tell your contacts before adding their information. This does not require importing your phone’s address book." },
  { title: "Clubs, experience & contributions", detail: "Club memberships, roles, sports experience, qualifications, equipment details, saved places and notes you provide.", purpose: "To organise club activities, plan outings and support relevant safety assessments.", choice: "Depends on the features you use and your role. Some information is visible to other authorised users." },
  { title: "Technical & support information", detail: "Service requests, error information and information you send to support. Service providers also receive connection information, such as IP addresses, when you use their services.", purpose: "To deliver maps and other features, operate and protect the service, diagnose problems and respond to requests.", choice: "Some technical processing is needed to deliver the services you use. Share only the information needed when contacting support." },
];

function RetentionDetails() {
  return <>
    <p>Account information and saved outing records are kept so you can continue using SafeWaters and revisit your activities. Stopping tracking, signing out or uninstalling the app does not delete records already stored by the service.</p>
    <p>You can request deletion at any time. Support aims to handle verified requests <strong>as soon as possible</strong>. There is currently no fixed completion deadline or automatic account-deletion schedule.</p>
    <p>Shared club records may also contain information about other people. Support will review your information in those records as part of the request and explain what can be deleted or anonymised. If any personal data must be retained for a specific security or legal reason, we will explain the reason and applicable retention period.</p>
    <p>A fixed retention period for backup copies has not yet been established. We cannot promise immediate removal from every backup. Ask support for the status of any remaining copies as part of your request.</p>
  </>;
}

export function DataSafetyPage() {
  return <InformationPage title="Data Safety" intro="Understand what SafeWaters uses, why it is needed and the choices you have when you plan, record and share an outing.">
    <div className="information-callout"><strong>Location sharing deserves a little care.</strong><p>People with a WaterBuddy link can view the outing information it makes available, including live progress. Only send it to people you want to follow the outing; they can forward it to others.</p></div>
    <h2>Information used by SafeWaters</h2>
    <p>This overview covers the SafeWaters app and its connected features. The exact information depends on what you use and choose to provide.</p>
    <div className="data-type-list">{dataTypes.map(item => <section className="data-type" key={item.title}>
      <h3>{item.title}</h3><p>{item.detail}</p>
      <dl><div><dt>Why it is used</dt><dd>{item.purpose}</dd></div><div><dt>Your choice</dt><dd>{item.choice}</dd></div></dl>
    </section>)}</div>
    <h2>Who can receive your information?</h2>
    <p>Relevant information is available to your crew and authorised club users, people you share outing links with, and the providers that deliver the service. These include Supabase for accounts and storage, Mapbox for maps and place search, Expo for app updates, and Cloudflare for website hosting. See the <Link to="/privacy#providers">privacy policy’s service-provider section</Link> for more detail.</p>
    <h2>Protecting your data</h2>
    <p>Connections to our hosted services use HTTPS to protect information in transit. Account sign-in, database access rules and restricted file links help control access. A WaterBuddy link gives its holder access to the shared outing, so treat it as private.</p>
    <h2>Make a request</h2>
    <p>For a copy or correction of your information, or to request removal of particular data while keeping your account, contact <SupportLink />. Support will verify the request and explain what can be done. To close your account, follow the <Link to="/delete-account">account deletion steps</Link>.</p>
    <p className="information-footnote">This page is a plain-language summary. Read the <Link to="/privacy">Privacy Policy</Link> for information about storage, sharing, retention and younger users.</p>
  </InformationPage>;
}

export function PrivacyPage() {
  return <InformationPage title="Privacy Policy" intro="How Polymathic Projects handles personal information when you use SafeWaters, WaterBuddy and this website.">
    <h2>Who to contact</h2>
    <p>SafeWaters is provided by Polymathic Projects. For questions about your information or to make a privacy request, email <SupportLink />. Please do not send passwords, sign-in codes or unnecessary sensitive information.</p>
    <h2>Information you provide</h2>
    <p>We use your name, email address, account ID and sign-in information to provide and manage your account. You may also provide a profile photo, contact details, sports experience, qualifications, club memberships and preferences.</p>
    <p>When you plan or record outings, we store the activity details you provide, including crew, equipment, places, notes, assessments and session records. These records can include physical-activity information such as duration, distance and route. Emergency-contact names, relationships and phone numbers are stored when you add them. Please make sure those people know you are providing their details.</p>
    <p>Photos you choose for your profile are uploaded for use in the service. Selecting an image does not mean SafeWaters uploads your whole photo library. Our <Link to="/data-safety">Data Safety overview</Link> explains these categories and their uses.</p>
    <h2>Location while using and recording activities</h2>
    <p>With your device permission, SafeWaters uses location to show your position and record and share your outing. GPS is prepared when you open the tracking screen. Location tracking stops if you leave that screen before starting, or when you end the outing.</p>
    <p>During an active outing, tracking can continue while the app is minimised or your phone is locked. Android uses a foreground service with a tracking notification. Location points may be stored on your phone while waiting for an internet connection, then uploaded to keep the outing record and live position up to date.</p>
    <p>You can change location permission in your device settings. Removing permission affects location-dependent features. It does not remove previously recorded routes or information already shared.</p>
    <h2>Sharing with crews, clubs and WaterBuddy viewers</h2>
    <p>Relevant profile, membership and outing information is available to crew members and authorised club users according to their role and the activity. A WaterBuddy link lets its holder view the outing information made available through that link, including the plan, route and live progress where available.</p>
    <p>Link recipients can forward the link or keep a copy of information they have seen. Share links carefully, particularly for outings involving younger people. Deleting information from SafeWaters cannot recall screenshots or independent copies held by other people.</p>
    <h2 id="providers">Service providers and website features</h2>
    <ul className="provider-list">
      <li><strong>Supabase</strong> provides authentication, database and file storage for accounts, profile images and outing records.</li>
      <li><strong>Mapbox</strong> provides maps and place search. Map requests and search terms are sent to Mapbox; its mobile mapping tools can also process location, device and usage information for their services. Read <a href="https://www.mapbox.com/legal/privacy">Mapbox’s privacy policy</a>.</li>
      <li><strong>Expo</strong> provides app-update services. Requests for updates include technical information needed to obtain a compatible version.</li>
      <li><strong>Cloudflare</strong> hosts this website and related web services. Connection and request information is processed to deliver and protect those services.</li>
      <li><strong>Ko-fi</strong> handles optional contributions on the Support Us page. Opening its embedded widget connects to Ko-fi, which may use cookies and process connection and payment information under <a href="https://more.ko-fi.com/privacy">its own privacy policy</a>. Do not send payment-card details to SafeWaters support.</li>
    </ul>
    <p>Service providers may process information in countries other than your own. Support can help with questions about the services involved in your request. Technical requests and service error records are also used to keep SafeWaters running and investigate failures.</p>
    <h2>Security and information on your device</h2>
    <p>Our hosted services use HTTPS connections to protect data in transit. Sign-in and database access rules restrict access to account information, and profile images use time-limited access links. Access through a shared outing link depends on possession of that link.</p>
    <p>The app keeps sign-in sessions, preferences, cached information and recorded points awaiting upload on your device. Protect your phone and sign out on shared devices. No service can guarantee that information will never be lost or accessed without permission.</p>
    <h2 id="retention">Retention and deletion</h2>
    <RetentionDetails />
    <p>See <Link to="/delete-account">Delete Account</Link> for the request process and the information covered.</p>
    <h2>Younger users and information about children</h2>
    <p>SafeWaters is intended for clubs and crews, including junior participants aged 9 and above. A parent, guardian or responsible club adult should help younger users understand what they are sharing, who can see it and how outing links work.</p>
    <p>This guidance is not an in-app parental-control or age-verification feature. If you are a parent or guardian with a concern about a child’s account, photo, location or outing information, contact <SupportLink />. We may need to verify your relationship and authority before providing information or acting on a request.</p>
    <h2>Your requests and choices</h2>
    <p>You can contact us to request a copy, correction or deletion of personal information, or to ask about limiting its use. Include the registered account email and enough detail to identify the request. Tell us if you are requesting removal of particular records rather than closure of the whole account.</p>
    <p>For account closure, use the <Link to="/delete-account">deletion request page</Link>. Permission settings, signing out and account deletion have different effects; support can help explain them.</p>
    <h2>Changes to this policy</h2>
    <p>We update this page when the service or its data practices change. The date above identifies the latest revision.</p>
  </InformationPage>;
}

export function DeleteAccountPage() {
  return <InformationPage title="Delete Account" intro="Request deletion of your SafeWaters account and associated personal data by contacting support. You do not need to reinstall the app or sign in to this website.">
    <a className="button button-primary deletion-button" href={deletionLink}>Email an account deletion request <span aria-hidden="true">↗</span></a>
    <p className="email-fallback">If the button does not open your email app, write to <SupportLink /> with the subject “SafeWaters account deletion request”.</p>
    <ol className="request-steps">
      <li><strong>Identify your account.</strong><p>Use your registered email address where possible. If you no longer have access to it, include that address and tell us so we can arrange another way to verify ownership.</p></li>
      <li><strong>Tell us what you want removed.</strong><p>For full deletion, ask to delete your account and associated personal data. To keep your account and remove particular information, describe those records instead.</p></li>
      <li><strong>Let support verify the request.</strong><p>We may ask for information needed to confirm ownership or authority. Never send your password or sign-in codes.</p></li>
    </ol>
    <h2>What your request covers</h2>
    <p>A full account-deletion request covers your sign-in account and associated personal data, including:</p>
    <ul><li>Profile details and uploaded profile photos.</li><li>Emergency contacts, preferences, sports experience and qualifications associated with your account.</li><li>Your personal information in club memberships, activity participation and notes.</li><li>Location, routes and other personal outing records associated with you.</li></ul>
    <p>Support reviews shared records and stored files as well as the account itself. Deletion of your account does not mean deleting other people’s accounts or all of your club’s records.</p>
    <h2>Timing and information that may remain</h2>
    <RetentionDetails />
    <div className="information-callout"><strong>An email starts the process.</strong><p>Account deletion is handled through support and is not automatic. Sending a request or uninstalling SafeWaters does not immediately erase your information. Support will confirm the outcome and explain any information that remains.</p></div>
    <h2>Shared links and copies</h2>
    <p>Tell support if your request concerns a WaterBuddy link or an outing shared with others. Information already copied or captured by recipients cannot be recalled from their devices through an account-deletion request.</p>
    <h2>Requests for a child</h2>
    <p>A parent or guardian can contact support about a child’s account or data. Include the account email if known and explain your relationship. We may need to verify your authority before acting.</p>
    <p>Read the <Link to="/privacy">Privacy Policy</Link> or <Link to="/data-safety">Data Safety overview</Link> for more about how information is used.</p>
  </InformationPage>;
}
