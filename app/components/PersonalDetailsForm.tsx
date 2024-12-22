import { PersonalDetails } from "@/type";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type Props = {
  personalDetails: PersonalDetails;
  setPersonalDetails: (pd: PersonalDetails) => void;
  setFile: (file: File | null) => void;
};

const PersonalDetailsForm: React.FC<Props> = ({
  personalDetails,
  setPersonalDetails,
  setFile,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof PersonalDetails
  ) => {
    setPersonalDetails({ ...personalDetails, [field]: e.target.value });
  };

  const handlePhoneChange = (value: string) => {
    setPersonalDetails({ ...personalDetails, phone: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="flex flex-col gap-4 poppins-regular">
      <input
        type="text"
        placeholder="Rene Boris Makoule"
        required
        onChange={(e) => handleChange(e, "fullName")}
        className="input input-bordered w-full"
      />
      <div className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="renemakoule@gmail.com"
          required
          onChange={(e) => handleChange(e, "email")}
          className="input input-bordered w-full"
        />
        <div className="w-full">
          <PhoneInput
            country={"cm"}
            value={personalDetails.phone}
            onChange={handlePhoneChange}
            inputClass="!w-full !h-full !text-base !font-normal"
            containerClass="!w-full"
            buttonClass="!h-full !border-r-0 !rounded-l-lg"
            dropdownClass="!rounded-lg !shadow-lg"
            searchClass="!rounded-t-lg"
            inputStyle={{
              width: "100%",
              height: "48px",
              fontSize: "1rem",
              paddingLeft: "48px",
              borderRadius: "0.5rem",
              backgroundColor: "transparent",
              border: "1px solid hsl(var(--bc) / 0.2)",
            }}
            buttonStyle={{
              backgroundColor: "transparent",
              border: "1px solid hsl(var(--bc) / 0.2)",
              borderRight: "none",
              borderTopLeftRadius: "0.5rem",
              borderBottomLeftRadius: "0.5rem",
            }}
          />
        </div>
      </div>

      <input
        type="text"
        placeholder="Douala, Cameroon, Pk10"
        required
        onChange={(e) => handleChange(e, "address")}
        className="input input-bordered w-full"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
        className="file-input file-input-bordered w-full file-input-primary"
      />

      <input
        type="text"
        placeholder="System Administrator"
        required
        onChange={(e) => handleChange(e, "postSeeking")}
        className="input input-bordered w-full"
      />

      <textarea
        placeholder="Dynamic – Committed – Versatile – Hardworking – Open-minded – Sociable – Multicultural – Team spirit – Good morality – Optimal time management – ​​Ease of adaptation and learning"
        required
        onChange={(e) => handleChange(e, "description")}
        className="input input-bordered w-full h-36"
      ></textarea>
    </div>
  );
};

export default PersonalDetailsForm;
