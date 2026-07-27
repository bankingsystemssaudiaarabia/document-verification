const supabaseUrl = "https://ohnevdjaksrnwpituybz.supabase.co";
const supabaseKey = "sb_publishable_mAXo7QqN1ZYQVgbGX7UQvw_VGbdr0I6";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

const form = document.querySelector("form");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    result.innerHTML = "";

    const idNumber = document.querySelectorAll("input")[0].value.trim();
    const serialNumber = document.querySelectorAll("input")[1].value.trim();

    if (!idNumber || !serialNumber) {
        result.innerHTML =
            "<p style='color:red;font-weight:bold;'>يرجى تعبئة جميع الحقول.</p>";
        return;
    }

    const button = document.querySelector('button[type="submit"]');

    button.disabled = true;
    button.textContent = "جاري التحقق...";

    const { data, error } = await supabaseClient
        .from("documents")
        .select("pdf_url")
        .eq("id_number", idNumber)
        .eq("serial_number", serialNumber)
        .single();

    button.disabled = false;
    button.textContent = "انقر هنا لتحميل الملف";

    if (error || !data) {
        result.innerHTML =
            "<p style='color:red;font-size:18px;font-weight:bold;'>❌ لم يتم العثور على المستند.</p>";
        return;
    }

    result.innerHTML = `
        <p style="color:green;font-size:20px;font-weight:bold;margin-bottom:20px;">
            ✅ تم التحقق من المستند بنجاح
        </p>

        <button id="viewPdf"
            style="
                background:#0052ff;
                color:white;
                border:none;
                padding:14px 35px;
                border-radius:14px;
                cursor:pointer;
                font-size:18px;
                font-family:Cairo;
            ">
            عرض PDF
        </button>
    `;

    document.getElementById("viewPdf").addEventListener("click", () => {
        window.open(data.pdf_url, "_blank");
    });

});