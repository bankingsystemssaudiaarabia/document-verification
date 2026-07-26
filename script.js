const SUPABASE_URL = "https://ohnevdjaksrnwpituybz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_mAXo7QqN1ZYQVgbGX7UQvw_VGbdr0I6";

async function verifyDocument() {

    const input = document.getElementById("verificationNumber");
    const result = document.getElementById("result");

    const verificationNumber = input.value.trim().toUpperCase();

    if (verificationNumber === "") {
        result.innerHTML = `
            <p class="error">
                Please enter a verification number.
            </p>
        `;
        return;
    }

    result.innerHTML = `
        <p>Checking...</p>
    `;

    try {

        const url =
            `${SUPABASE_URL}/rest/v1/documents?verification_number=eq.${encodeURIComponent(verificationNumber)}&select=pdf_url`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            }
        });

        const responseText = await response.text();

        console.log("HTTP Status:", response.status);
        console.log("Supabase Response:", responseText);

        if (!response.ok) {

            result.innerHTML = `
                <p class="error">
                    Supabase Error:
                </p>

                <p>
                    HTTP Status: ${response.status}
                </p>

                <p>
                    ${responseText}
                </p>
            `;

            return;
        }

        const data = JSON.parse(responseText);

        if (data.length > 0) {

            const pdfURL = data[0].pdf_url;

            result.innerHTML = `
                <p class="success">
                    Verification successful ✓
                </p>

                <a
                    href="${pdfURL}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="view-pdf"
                >
                    VIEW PDF
                </a>
            `;

        } else {

            result.innerHTML = `
                <p class="error">
                    Invalid verification number.
                </p>
            `;

        }
