import { useState } from "react";
import { PlusIcon, PhotoIcon } from "@heroicons/react/20/solid";
import { Button } from "@nextui-org/react";
import * as XLSX from "xlsx";

const Plan = ({ textData }) => {
  const [emailBuild, setEmailBuild] = useState(false);
  const [emails, setEmails] = useState([]); // Array of emails
  const [singleEmail, setSingleEmail] = useState(""); // Single email
  const [name, setName] = useState("");
  const [fallbackSubjectLine, setFallbackSubjectLine] = useState("");
  const [composeEmail, setComposeEmail] = useState(false);
  const [buttonText, setButtonText] = useState("Compose your Email");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (isOpen) {
      window.scrollTo(0, 0);
    }
  }, [isOpen]); // Re-run effect when isOpen changes

  const providers = [
    {
      name: "Google Drive",
      imageUrl: "/images/google_drive.png",
    },
    {
      name: "Google Sheets",
      imageUrl: "/images/google-sheets.png",
    },
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      // Extract emails and names
      const emailList = json.map((row) => {
        const firstName =
          row.Firstname ||
          row.firstName ||
          row.first_name ||
          row.firstname ||
          "";
        const lastName =
          row.Lastname || row.lastName || row.last_name || row.lastname || "";

        const fileName = row.name || name || `${firstName} ${lastName}`.trim();

        // Return an object containing email, firstName, and lastName
        return { email: row.Email, firstName, lastName, name: fileName };
      });

      // Store the emailList in the emails state
      setEmails(emailList);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSendEmail = async () => {
    if (emails.length > 0 || singleEmail) {
      setComposeEmail(true);
      setButtonText("Send Email");

      if (composeEmail) {
        const emailData =
          emails.length > 0
            ? emails
            : [{ email: singleEmail, firstName, lastName, name }];

        const response = await fetch("/api/partner/getPostByEmails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emails: emailData,
            subjectLine: fallbackSubjectLine,
          }),
        });

        // Handle the response if needed
        if (response.ok) {
          console.log("Emails sent successfully");
        } else {
          console.error("Failed to send emails");
        }
      }
    }
  };

  // Function to connect to external sources (e.g., Salesforce, Google Drive)
  const handleConnectSource = (source) => {
    console.log(`Connecting to ${source.name}`);
    // Logic to connect to the source and fetch emails
  };

  return (
    <>
      {emailBuild ? (
        <div className="mx-auto max-w-md sm:max-w-3xl">
          <div className="text-center">
            <PhotoIcon
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-gray-400"
            />
            <h2 className="mt-2 text-base font-semibold leading-6 text-gray-900">
              Build Email list
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Launch an email campaign. Let's find some donors
            </p>
          </div>

          {/* File Upload Section */}
          <div className="col-span-full">
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Upload file of your contact list below or build one with our API
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  aria-hidden="true"
                  className="mx-auto h-12 w-12 text-gray-300"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={handleFileUpload}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  Excel files only (.xlsx, .xls)
                </p>
              </div>
            </div>
          </div>

          {/* Single Email Input Section */}
          <div className="mt-6">
            <label
              htmlFor="single-email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Enter Donor's email
            </label>
            <input
              type="email"
              id="single-email"
              value={singleEmail}
              onChange={(e) => setSingleEmail(e.target.value)}
              placeholder="Enter Donor's email"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
          <div className="mt-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Enter Donor's Name
            </label>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Donor's Name"
              className="mt-2 block w-full rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm h-[38px]"
            />
          </div>
          {singleEmail && (
            <>
              <div className="mt-6">
                <label
                  htmlFor="subject-line"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Subject Line
                </label>
                <input
                  type="text"
                  id="subject-line"
                  value={fallbackSubjectLine}
                  onChange={(e) => setFallbackSubjectLine(e.target.value)}
                  placeholder="Enter a 'Fallback Subject Line'"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>
            </>
          )}

          <div className="mt-4">
            <Button
              type="button"
              onClick={handleSendEmail}
              className="bg-red-600 text-white w-full"
            >
              {buttonText}
            </Button>
          </div>

          {/* External Sources Section */}
          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-500">
              Connect Email Sources
            </h3>
            <ul
              role="list"
              className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {providers.map((source, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleConnectSource(source)}
                    className="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <span className="flex min-w-0 flex-1 items-center space-x-3">
                      <span className="block flex-shrink-0">
                        <img
                          alt={source.name}
                          src={source.imageUrl}
                          className="h-10 w-10 rounded-full"
                        />
                      </span>
                      <span className="block truncate text-sm font-medium text-gray-900">
                        {source.name}
                      </span>
                    </span>
                    <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center">
                      <PlusIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="mt-6 border-t border-gray-100">
          {textData.map((data, index) => (
            <div key={index} className="mt-6">
              <dl className="divide-y divide-gray-100">
                <div className="mt-6 border-t border-gray-100">
                  <div className="px-4 py-6 flex flex-col sm:px-0">
                    <p className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 whitespace-pre-line">
                      {data.assistantResponse}
                    </p>
                  </div>
                </div>
              </dl>
              <div className="flex justify-center flex-col text-gray-700">
                Next, let's find and build an email list of donors based on the
                ideal profile.
                <Button
                  type="button"
                  onClick={() => setEmailBuild(true)}
                  className="build-email bg-slate-500 rounded-md my-3 text-white w-[200px] m-auto"
                >
                  Let's Build Email
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Plan;
