"use client";

import { Eye, RotateCw, Save } from "lucide-react";
import Image from "next/image";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import { useEffect, useRef, useState } from "react";
import {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Skill,
} from "@/type";
import {
  educationsPreset,
  experiencesPreset,
  hobbiesPreset,
  languagesPreset,
  personalDetailsPreset,
  skillsPreset,
} from "@/presets";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import LanguageForm from "../components/LanguageForm";
import SkillForm from "../components/SkillForm";
import HobbyForm from "../components/HobbyForm";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import confetti from "canvas-confetti";
import Link from "next/link";
import React from "react";
import AdSystem from "../components/AdSystem";
import { Toaster } from "react-hot-toast";
import CVPreviewMinimal from "../components/cv-preview-minimal";
import Toggle from "../components/Toggle";

export default function Home() {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(
    personalDetailsPreset
  );
  const [file, setFile] = useState<File | null>(null);
  const [theme, setTheme] = useState<string>("cupcake");
  const [zoom, setZoom] = useState<number>(163);
  const [experiences, setExperience] =
    useState<Experience[]>(experiencesPreset);
  const [educations, setEducations] = useState<Education[]>(educationsPreset);
  const [languages, setLanguages] = useState<Language[]>(languagesPreset);
  const [skills, setSkills] = useState<Skill[]>(skillsPreset);
  const [hobbies, setHobbies] = useState<Hobby[]>(hobbiesPreset);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const defaultImageUrl = "/poket.jpg";
    fetch(defaultImageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const defaultFile = new File([blob], "poket.jpg", { type: blob.type });

        setFile(defaultFile);
      });
  }, []);

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];

  const handleResetPersonalDetails = () =>
    setPersonalDetails({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      photoUrl: "",
      postSeeking: "",
      description: "",
    });

  const handleResetExperiences = () => setExperience([]);
  const handleResetEducations = () => setEducations([]);
  const handleResetLanguages = () => setLanguages([]);
  const handleResetSkills = () => setSkills([]);
  const handleResetHobbies = () => setHobbies([]);

  const cvPreviewRef = useRef(null);

  const handleDownloadPdf = async () => {
    const element = cvPreviewRef.current;
    if (element) {
      try {
        setIsDownloading(true);

        const canvas = await html2canvas(element, {
          scale: 3,
          useCORS: true,
        });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "A4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`cv.pdf`);

        const modal = document.getElementById(
          "my_modal_3"
        ) as HTMLDialogElement;
        if (modal) {
          modal.close();
        }

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          zIndex: 9999,
        });
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  React.useEffect(() => {
    // Ajouter le script Google Analytics
    const script1 = document.createElement("script");
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-BPZC3KD93L";
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-BPZC3KD93L');
    `;
    document.head.appendChild(script2);

    // Nettoyage
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <div className="poppins-regular">
      <Toaster />
      <div className="hidden lg:block">
        <section className="flex items-center h-screen">
          <div className="w-1/3 h-full p-10 bg-base-200 scrollable no-scrollbar ">
            <div className="mb-4 flex justify-between items-center w-full">
              <Link href="/Cv" target="_blank">
                <h1 className="text-xl font-bold italic">
                  CV
                  <span className="text-primary">Builder</span>
                  <span className="text-success">Makoule</span>
                </h1>
              </Link>

              <button
                className="btn btn-success btn-outline btn-xs text-xs h-10"
                onClick={() =>
                  (
                    document.getElementById("my_modal_3") as HTMLDialogElement
                  ).showModal()
                }
              >
                Preview
                <Eye className="w-4" />
              </button>
            </div>

            <div className="flex  flex-col gap-6 rounded-lg">
              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">
                  Who are you ? ?
                </h1>
                <button
                  onClick={handleResetPersonalDetails}
                  className="btn btn-outline btn-success btn-xs h-8"
                >
                  <RotateCw className="w-4" />
                </button>
              </div>

              <PersonalDetailsForm
                personalDetails={personalDetails}
                setPersonalDetails={setPersonalDetails}
                setFile={setFile}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">
                  Experiences
                </h1>
                <button
                  onClick={handleResetExperiences}
                  className="btn btn-outline btn-success btn-xs h-8"
                >
                  <RotateCw className="w-4" />
                </button>
              </div>

              <ExperienceForm
                experience={experiences}
                setExperiences={setExperience}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">
                  Educations
                </h1>
                <button
                  onClick={handleResetEducations}
                  className="btn btn-outline btn-primary btn-xs h-8"
                >
                  <RotateCw className="w-4" />
                </button>
              </div>

              <EducationForm
                educations={educations}
                setEducations={setEducations}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Languages</h1>
                <button
                  onClick={handleResetLanguages}
                  className="btn btn-outline btn-primary btn-xs h-8"
                >
                  <RotateCw className="w-4" />
                </button>
              </div>

              <LanguageForm languages={languages} setLanguages={setLanguages} />

              <div className="flex justify-between">
                <div className="w-1/2">
                  <div className="flex justify-between items-center">
                    <h1 className="badge badge-primary badge-outline">
                      SKILLS
                    </h1>
                    <button
                      onClick={handleResetSkills}
                      className="btn btn-outline btn-primary btn-xs h-8"
                    >
                      <RotateCw className="w-4" />
                    </button>
                  </div>
                  <SkillForm skills={skills} setSkills={setSkills} />
                </div>

                <div className="ml-4 w-1/2">
                  <div className="flex justify-between items-center">
                    <h1 className="badge badge-primary badge-outline">
                      Hobbies
                    </h1>
                    <button
                      onClick={handleResetHobbies}
                      className="btn btn-outline btn-primary btn-xs h-8"
                    >
                      <RotateCw className="w-4" />
                    </button>
                  </div>
                  <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-2/3 h-full bg-base-100 bg-[url('/file.svg')] bg-cover  bg-center scrollable-preview relative">
            <div className="flex items-center justify-center fixed z-[9999] top-5 right-5 space-x-1 text-xs">
            <Toggle />
              <label htmlFor="">zoom</label>
              <input
                type="range"
                min={30}
                max={250}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="range range-xs range-success "
              />
              <p className="ml-4 text-xs text-primary">{zoom}%</p>
            </div>
            <div className="fixed z-[9999] top-12 right-5 space-x-1 text-xs">
              <label htmlFor="">theme color</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="select select-bordered select-sm"
              >
                {themes.map((themeName) => (
                  <option key={themeName} value={themeName}>
                    {themeName}
                  </option>
                ))}
              </select>
            </div>

            <div
              className="flex justify-center items-center"
              style={{
                transform: `scale(${zoom / 200})`,
              }}
            >
              <CVPreviewMinimal
                personalDetails={personalDetails}
                file={file}
                theme={theme}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobbies}
                skills={skills}
              />
            </div>
          </div>
        </section>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box w-full max-w-6xl mx-auto px-4 sm;px-6 lg:px-8">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <div className="mt-5">
              <div className="flex justify-end mb-5">
                <button
                  onClick={handleDownloadPdf}
                  className="btn btn-primary"
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      PDF Download
                      <span className="loading loading-ring loading-xs"></span>
                      <span className="loading loading-ring loading-xs"></span>
                      <span className="loading loading-ring loading-xs"></span>
                    </>
                  ) : (
                    <>
                      Download
                      <Save className="w-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="w-full max-x-full overflow-auto">
                <div className="w-full max-w-full flex justify-center items-center">
                  <CVPreviewMinimal
                    personalDetails={personalDetails}
                    file={file}
                    theme={theme}
                    experiences={experiences}
                    educations={educations}
                    languages={languages}
                    hobbies={hobbies}
                    skills={skills}
                    download={true}
                    ref={cvPreviewRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </div>

      <div className="lg:hidden">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-3xl font-bold">
                Sorry, CV Builder Mak is only accessible on tablet or computer.
              </h1>
              <Image
                src="/sad-sorry.gif"
                width={500}
                height={500}
                alt="Picture of the author"
                className="mx-auto my-6"
              />
              <p className="py-6">
                To create and customize your CV, please use a computer or
                tablet. Thank you for your understanding..
              </p>
            </div>
          </div>
        </div>
      </div>
      <AdSystem />
    </div>
  );
}
