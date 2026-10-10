"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const profileKey = "placeready_profile";
  const resumeKey = "placeready_resume";

  const form = document.getElementById("resumeForm");
  const message = document.getElementById("resumeMessage");

  if (!form) return;

  const fieldNames = [
    "resumeName",
    "resumeEmail",
    "resumePhone",
    "resumeLocation",
    "resumeRole",
    "resumeSkills",
    "resumeDegree",
    "resumeCollege",
    "resumeYear",
    "resumeEducationDetails",
    "resumeProjects",
    "resumeCertifications",
    "resumeExperience"
  ];

  const readStoredObject = (key) => {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "{}");
      return value && typeof value === "object" && !Array.isArray(value)
        ? value
        : {};
    } catch {
      return {};
    }
  };

  const profile = readStoredObject(profileKey);
  const savedResume = readStoredObject(resumeKey);

  // Load previously saved resume data first.
  // If no resume exists yet, use the saved profile.
  const initialValues = {
    resumeName: profile.fullName || "",
    resumeEmail: profile.email || "",
    resumePhone: "",
    resumeLocation: "",
    resumeRole: profile.objective || profile.targetRole || "",
    resumeSkills: profile.skills || "",
    resumeDegree: profile.course || "",
    resumeCollege: profile.college || "",
    resumeYear: "",
    resumeEducationDetails: "",
    resumeProjects: "",
    resumeCertifications: "",
    resumeExperience: "",
    ...savedResume
  };

  fieldNames.forEach((name) => {
    const field = document.getElementById(name);
    if (field) field.value = initialValues[name] || "";
  });

  function getValues() {
    const values = {};
    fieldNames.forEach((name) => {
      const field = document.getElementById(name);
      values[name] = field ? field.value.trim() : "";
    });
    return values;
  }

  function setMessage(text, isError = false) {
    message.textContent = text;
    message.style.color = isError ? "#b42318" : "#16794b";
  }

  // Use textContent rather than HTML injection to display user-entered text.
  function setText(id, value, fallback) {
    const element = document.getElementById(id);
    if (element) element.textContent = value || fallback;
  }

  function showSection(sectionId, textId, value, fallback) {
    const section = document.getElementById(sectionId);
    setText(textId, value, fallback);
    if (section) section.hidden = !value;
  }

  function updatePreview() {
    const data = getValues();

    setText("previewName", data.resumeName, "Your Name");

    const contact = [
      data.resumeEmail,
      data.resumePhone,
      data.resumeLocation
    ].filter(Boolean).join(" · ");

    setText("previewContact", contact, "Add your contact information");

    showSection(
      "objectiveSection",
      "previewObjective",
      data.resumeRole,
      ""
    );

    showSection(
      "skillsSection",
      "previewSkills",
      data.resumeSkills,
      ""
    );

    const education = [
      data.resumeDegree,
      data.resumeCollege,
      data.resumeYear ? `Graduation: ${data.resumeYear}` : "",
      data.resumeEducationDetails
    ].filter(Boolean).join("\n");

    showSection(
      "educationSection",
      "previewEducation",
      education,
      ""
    );

    showSection(
      "projectsSection",
      "previewProjects",
      data.resumeProjects,
      ""
    );

    showSection(
      "certificationsSection",
      "previewCertifications",
      data.resumeCertifications,
      ""
    );

    showSection(
      "experienceSection",
      "previewExperience",
      data.resumeExperience,
      ""
    );
  }

  function saveResume(event) {
    if (event) event.preventDefault();

    if (!form.reportValidity()) return;

    try {
      localStorage.setItem(resumeKey, JSON.stringify(getValues()));
      updatePreview();
      setMessage("Resume saved successfully in this browser.");
    } catch {
      setMessage(
        "Could not save the resume. Check browser storage settings.",
        true
      );
    }
  }

  form.addEventListener("submit", saveResume);

  // Update the preview while the student types.
  form.addEventListener("input", updatePreview);

  document.getElementById("refreshPreview").addEventListener(
    "click",
    () => {
      updatePreview();
      setMessage("Resume preview updated.");
    }
  );

  document.getElementById("printResume").addEventListener(
    "click",
    () => {
      updatePreview();
      window.print();
    }
  );

  updatePreview();
});
