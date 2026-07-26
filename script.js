const SUPABASE_URL = "https://ohnevdjaksrnwpituybz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_mAXo7QqN1ZYQVgbGX7UQvw_VGbdr0I6";


async function verifyDocument() {

    const input = document.getElementById("verificationNumber");

    const result = document.getElementById("result");

    const verificationNumber = input.value.trim().toUpperCase();


    // Check if the user entered a number

    if (verificationNumber === "") {

        result.innerHTML = `
            <p class="error">
                Please enter a verification number.
            </p>
        `;

        return;
    }


    // Show loading message

    result.innerHTML = `
        <p>
            Checking verification number...
        </p>
    `;


    try {

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/documents?verification_number=eq.${encodeURIComponent(verificationNumber)}&select=pdf_url`,
            {
                method: "GET",

                headers: {
                    "apikey": SUPABASE_ANON_KEY,
                    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
                }
            }
        );


        if (!response.ok) {

            throw new Error("Database request failed");

        }


        const data = await response.json();


        // Verification number found

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

            // Verification number not found

            result.innerHTML = `
                <p class="error">
                    Invalid verification number.
                </p>
            `;

        }


    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <p class="error">
                An error occurred while checking the verification number.
                Please try again.
            </p>
        `;

    }

}