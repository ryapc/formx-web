---
title: "How to Extract Data from Passport?"
description: "A complete guide to passport data extraction: how OCR and AI read the MRZ and VIZ, which methods to use, and how to integrate a passport OCR API for KYC, hotel, and travel workflows."
excerpt: "A complete guide to passport data extraction: how OCR and AI read the MRZ and VIZ, which methods to use, and how to integrate a passport OCR API for KYC, hotel, and travel workflows."
category: automation
author: FormX
date: 2026-04-14
lastmod: 2026-05-26
featured_image: "/images/blog/623ad359fb55b3c096ee29ef_buffer-gc3fb02c1c_1280.jpeg"
featured_image_alt: "How to Extract Data from Passport?"
canonical_url: "/blog/how-to-capture-data-from-passport-and-id-cards-with-ocr-ai/"
---

Extracting passport data used to mean staring at a biographic page and typing. Full name, date of birth, passport number, expiry date. Repeated hundreds of times a day by staff with better things to do.

Modern passport OCR changes that. It combines optical character recognition with AI to capture a passport image and return structured data in seconds, targeting two zones at once: the Visual Inspection Zone (VIZ) with its human-readable fields, and the Machine Readable Zone (MRZ) with its encoded alphanumeric strings. Checksum validation runs against every extracted value to confirm it's mathematically correct, not just transcribed.

## What is passport data extraction?

Passport data extraction converts a passport image or scan into structured, machine-readable output (typically JSON or XML) using OCR and AI. A passport has two distinct zones: the VIZ holds human-readable information like the holder's name, nationality, and date of birth. The MRZ holds encoded alphanumeric strings that follow ICAO international standards.

Modern AI-powered extraction reads both zones simultaneously, using checksum logic built into the MRZ to verify accuracy rather than just transcription. The alternative is manual entry: several minutes per document, multiplied across hundreds of daily onboarding events. Banks, hotels, immigration services, and airlines all have this problem. They've had it for decades.

### Visual Inspection Zone (VIZ) vs Machine Readable Zone (MRZ)

The VIZ is what a human reads at a border checkpoint or hotel front desk: full name, photo, nationality, date of birth, document number, dates of issue and expiry, and issuing authority.

The MRZ is the two lines of 44 characters at the bottom of the biographic page, encoded in OCR-B font and structured under ICAO Document 9303. Because field positions are fixed by that standard, a parser doesn't need to figure out where each field starts and ends. It reads the correct character positions directly.

Each MRZ field includes a check digit calculated from the preceding characters. Any discrepancy between the extracted value and its check digit signals either an OCR error or a potentially altered document. That's the mechanism that makes MRZ-based extraction reliably more accurate than reading the VIZ alone.

![A sample European passport with the machine readable zone code highlighted](/images/blog/6268bc1b349c0e824e2196f3_gIROdxrfXsZHQquBBj3ddNBC9GeU99x_qesp0mzZwXXTmMCYH9tIgvJZnovaLK0JS4c0ivZjubPPmrKWLgHi6TqPJRDwTIWW1EVrgMw-hHJdsiIr4DZPxXyMdMH1vyWcHmS_7fUM.jpeg)

## What data points are typically extracted from a passport?

Every ICAO-compliant travel document yields the same core fields: full name, gender, nationality, date of birth, passport number, date of issue, date of expiry, and the three-letter country code of the issuing authority. That's true whether the passport is British, Indian, or Nigerian.

The MRZ adds its own layer: document type code, composite check digits for the full MRZ line, and in some countries a personal number for national identification purposes. Where the VIZ gives you human-readable values, the MRZ gives machine-verified equivalents that can be cross-checked against each other.

Most extraction systems also capture metadata alongside the identity fields: image resolution in DPI, document boundary coordinates, face crop coordinates, and per-field confidence scores. These let downstream systems assess image quality and decide whether a result is trustworthy before passing it through. Some systems also flag the presence of a chip indicator, signaling whether the document supports NFC retrieval for higher-assurance verification.

## What methods are used to extract data from passport?

There are four main approaches: AI and cloud OCR platforms, developer libraries with image preprocessing, no-code online tools, and RFID/NFC scanning for chip-enabled passports. The right choice depends on document volume, integration requirements, and how strict your accuracy and compliance standards are.

### AI and cloud OCR platforms

Modern AI-powered passport OCR platforms use computer vision and large language models to extract VIZ and MRZ data with high accuracy. They handle variations in lighting, orientation, and print quality without requiring manual preprocessing. Because they're trained on passport formats from hundreds of issuing countries, they work reliably across a wide document variety without nationality-specific configuration.

Dedicated passport OCR APIs from providers like FormX.ai, Mindee, and Veryfi return structured JSON that maps directly to identity verification schemas. Send a document image; get back a complete, validated record in seconds. All preprocessing, recognition, and validation runs server-side.

For high-volume automated workflows, cloud platforms are the practical default. Latency matters when onboarding completion rates depend on it.

### Developer libraries and image preprocessing

Open-source OCR libraries including Tesseract, EasyOCR, and DocTR let developers build custom passport extraction pipelines at no licensing cost, with full control over recognition and parsing logic. They handle character recognition. MRZ field parsing and checksum validation have to be built on top.

These libraries improve significantly when combined with OpenCV for preprocessing: correcting skew, lighting, glare, and low resolution before recognition is the highest-leverage step in a custom pipeline. A document that produces unreliable OCR output raw will often produce accurate output after normalization.

Custom pipelines need ongoing maintenance as document formats evolve and edge cases from different issuing countries appear. They suit teams with dedicated engineering capacity. Managed APIs are the better fit for everyone else.

### No-code online tools

No-code tools let users upload a passport image and download extracted data as text or CSV without writing code. For occasional, low-volume needs they require no technical setup.

They don't scale. There's no API access, no structured JSON output, no integration capability. Every extraction is a manual action.

Security constraints also limit their use in regulated industries. Uploading identity documents to third-party web services creates data handling obligations that GDPR and similar frameworks explicitly address. Organizations operating under [KYC](/blog/the-developers-blueprint-for-autonomous-data-pipelines-solving-the-data-debt-crisis/) or AML requirements typically can't use consumer-grade tools for this.

### NFC and RFID chip scanning

Passports issued by most countries since 2006 contain an RFID microchip storing a digital copy of the biographic data, a facial image, and in some cases fingerprints. All of it is signed with a digital certificate that can be cryptographically verified. The chip holds the same information as the printed biographic page in a format that can't be forged without invalidating that signature.

NFC-enabled readers and mobile apps extract data directly from the chip, bypassing OCR entirely. Because the data comes from a digitally signed source, accuracy is as good as it gets. Passive authentication confirms the chip hasn't been tampered with since it was issued.

The limitation is physical. NFC scanning only works in-person, with the document present and an NFC-capable device. It's not an option for remote onboarding or document submission workflows.

## What is passport OCR?

Passport OCR is optical character recognition trained specifically on travel document formats, with dedicated logic for parsing MRZ strings and validating extracted values against ICAO checksum rules. General-purpose OCR transcribes whatever text appears in an image. Passport OCR applies domain knowledge of document structure, character encoding standards, and mathematical validation to produce verified output.

### How does passport OCR work?

The process starts with image capture. Input quality determines output quality at every step that follows. Document detection, focus checking, and glare elimination aren't nice-to-haves. They're the difference between a useful result and a low-confidence mess.

After the image is normalized, the OCR engine locates the MRZ by its OCR-B font and fixed-width character structure, extracts each field by its known position within the two 44-character lines, and validates extracted values using the embedded check digits. Once the MRZ region is correctly located, field recognition is deterministic.

The VIZ is processed in parallel using layout detection and named entity recognition, producing a complete structured record that reconciles human-readable and machine-readable data before returning output. If the VIZ and MRZ values for a field disagree (say, different dates of birth), the system flags the discrepancy rather than silently picking one.

### MRZ parsing and checksum validation

The MRZ follows ICAO Document 9303. Line 1 encodes document type, issuing country, and surname followed by given names. Line 2 encodes document number, nationality, date of birth, sex, date of expiry, and personal number. Field positions are fixed, so parsing doesn't require any visual interpretation of field boundaries.

Check digits are single-digit values calculated from the preceding characters using a weighted modulo-10 algorithm: weights of 7, 3, and 1 repeat cyclically, their products sum, and the result takes modulo 10. A passport number field reading "AB1234563" is valid only if the final digit 3 matches that calculation applied to "AB123456". Any discrepancy is either an OCR error or a potentially altered document.

A solid passport OCR system compares MRZ-derived values against the corresponding VIZ fields and flags inconsistencies for human review. That cross-validation is what separates a verification-grade extraction system from a basic transcription tool.

## What are the common use cases for passport data extraction?

The pattern across industries is consistent: high daily document volume, strict accuracy requirements, and a downstream system that needs structured data rather than a scanned image. Manual entry doesn't work at that combination.

### KYC and financial services onboarding

Banks, fintech platforms, and regulated financial institutions use passport OCR as the data capture step in [KYC workflows](/blog/the-developers-blueprint-for-autonomous-data-pipelines-solving-the-data-debt-crisis/). A customer who photographs their passport during digital onboarding never has to type their name, date of birth, or document number. Transcription errors that cause identity mismatches during verification are eliminated at the source.

Onboarding abandonment increases with every additional step or delay. Faster document extraction isn't just an operational metric; it affects conversion directly. Passport OCR in KYC contexts is typically combined with liveness detection and document authenticity checks to create a complete remote identity verification pipeline that meets regulatory requirements without an in-person visit.

### Hotel and hospitality check-in

Hotels use passport scanning to automate guest registration. Staff who previously spent several minutes per international guest on manual data entry can focus on the actual check-in interaction while extraction runs in the background.

Many jurisdictions legally require hotels to collect and retain passport data for all foreign guests, making automated extraction both an operational efficiency and a compliance requirement. Mobile check-in apps let guests submit their passport before arrival. By the time they walk in, their identity is already verified.

### Immigration and border control

Immigration authorities process travelers at kiosks capable of reading and validating a passport biographic page in under three seconds. At major international airports where thousands of passengers arrive within the same hour, the gap between three-second automated reading and thirty-second manual inspection determines whether queues are manageable.

Automated border control gates combine passport chip reading with facial recognition: a two-factor identity check that's substantially harder to defeat than visual inspection alone. Accuracy and availability requirements here are the strictest of any use case. Errors or downtime directly delay travelers and create security gaps that manual fallback can't fully cover at high-volume crossings.

### Travel and airline operations

Airlines extract passport data from scanned documents during pre-flight check-in to prepopulate advance passenger information systems required by destination country border agencies. Most countries now mandate that carriers transmit passport data before departure. Automated extraction is what makes that transmission practical at airline scale.

A single transcription error in a passport number can trigger an advance passenger information rejection that strands a traveler and creates financial liability for the airline. Travel platforms using mobile document capture let passengers verify their passport during online check-in, clearing document verification automatically at the airport and cutting queue times at check-in counters and bag drop.

## How to integrate a passport OCR API into your system?

A passport OCR API accepts a passport image, runs preprocessing, MRZ parsing, VIZ extraction, and cross-validation server-side, and returns a structured JSON object with all extracted fields and individual confidence scores, typically within two seconds. The entire pipeline runs on the provider's infrastructure. The calling application receives verified, structured data without implementing any OCR or parsing logic of its own.

Integration is a single POST request to the API endpoint with the document image as base64 or a multipart form upload. It works with any application stack that can make HTTP requests. No dependencies, no models to host, no preprocessing to maintain on the client side.

The JSON response maps to standard identity data schemas used by KYC platforms, property management systems, and airline departure control systems. Field names are consistent across all passport nationalities, so the same integration code handles any nationality without conditional logic.

### Passport OCR SDK for mobile applications

The FormX Mobile SDK provides native in-app document capture with real-time passport detection, automatic focus and exposure adjustment, blur detection, and glare identification before submission. It guides users to capture a photo that meets the quality threshold for accurate extraction, preventing the most common cause of extraction failure before it happens.

In-app capture produces consistently higher-quality images than manual file uploads, which improves extraction accuracy and reduces the frequency of low-confidence results that require human review or re-submission. The SDK supports both iOS and Android and returns the same structured JSON as the API.

## How to extract data from passport with FormX.ai?

FormX.ai extracts structured data from passport images in real time using OCR, AI, and MRZ parsing, returning a complete JSON record with all biographic fields, MRZ values, and per-field confidence scores. No template configuration required. The platform supports passport formats from over 190 ICAO member countries, handling layout variations, font differences, and laminate patterns across issuing authorities.

### Step 1: Sign in and select the passport template

Sign in to the FormX portal and select the predefined Passport extractor from the template library. You can test extraction against your own passport images immediately, without writing any code.

![FormX.ai sign-up page with email field and Google sign-in option](/images/blog/638d904c6a8a2713bfb436c8_passport-step-1.png)

### Step 2: Upload a test image

Upload a photograph or scan of a passport biographic page. The extracted JSON output appears in real time, with each field labeled, its value displayed, and a confidence score alongside. The interface highlights the detected MRZ region and each VIZ field directly on the document image, so you can verify that extraction is reading the right areas before committing to API integration.

![FormX Admin Extractors dashboard with Create New Extractor button highlighted in red](/images/blog/638d905f9ba7274303e8f4dd_passport-step-2.png)

![FormX Admin Government ID/Passport extractor test interface with sample passport thumbnails and file upload area](/images/blog/638d9092dfce23f5e7c54fb9_passport-step-4.png)

### Step 3: Review JSON output and field mapping

The extraction output is a structured JSON object with all standard passport fields mapped to consistent key names, regardless of the source passport's country or language. Confidence scores below a configurable threshold are flagged automatically, routing low-confidence extractions to a human reviewer while high-confidence results pass straight through.

![FormX Admin showing extracted Dutch passport fields including surname, given names, and nationality with confidence scores](/images/blog/638d90b765555a0e51198fec_passport-step-5.png)

![FormX Admin JSON Output panel displaying structured passport extraction results with field names and confidence scores](/images/blog/638d90bffbd74de0488f1e25_passport-step-6.png)

### Step 4: Integrate via API or Zapier

Copy the Form ID and Access Token from the "Extract" tab.

![FormX Admin Extract tab showing API integration with Form ID, Access Token fields, and cURL code sample](/images/blog/638d90d014dc6e209e51f194_passport-step-7.png)

The FormX Passport API accepts passport images via a single REST endpoint and returns structured JSON within seconds. For no-code workflows, the FormX Zapier integration connects passport extraction to CRMs, spreadsheets, and database platforms without any programming.

## Start extracting passport data

Passport OCR has moved from a niche capability to a baseline requirement for any workflow that handles identity documents at volume. The difference between extraction systems isn't whether they can read a passport. It's whether they validate what they read.

[Sign up for a free account](https://formextractorai.com/signup) or [contact us](/schedule-demo) to see how FormX handles passport and ID card extraction for your use case.
