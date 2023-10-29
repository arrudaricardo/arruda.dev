import Script from "next/script";

export default function Meeting() {
  return (
    <>
      <Script src="https://assets.calendly.com/assets/external/widget.js" />
      <div
        className={`calendly-inline-widget`}
        data-url="https://calendly.com/ricardodearruda/30min?hide_landing_page_details=1&hide_gdpr_banner=1"
        style={{ minWidth: "320px", height: "630px" }}
      ></div>
    </>
  );
}
