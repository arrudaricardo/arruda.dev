export default async function PdfDownload() {
  const date = new Date().toLocaleDateString().replace(/\//g, "-");
  const fileName = `ricardo-arruda-resume-generated.pdf`;

  return (
    <a
      href={fileName}
      target="_blank"
      download={fileName.replace(/\.pdf/g, `-${date}.pdf`)}
    >
      Download
    </a>
  );
}
