import EditableField from "../components/EditableField";
import { Briefcase, MapPin, Mail, Phone, Linkedin } from "lucide-react";
import FieldVisibilityControls from "../components/FieldVisibilityControls";

export default function PersonalInfoSection({ formData, setFormData, currentTheme }) {
  const toggleField = (field) => {
    setFormData((prev) => ({
      ...prev,
      visibility: {
        ...prev.visibility,
        [field]: !prev.visibility[field],
      },
    }));
  };

  const fieldLabels = {
    title: "Role",
    location: "Location",
    email: "Email",
    phone: "Phone",
    linkedin: "LinkedIn",
  };

  return (
    <div id="person-card" className="col-span-3 space-y-6">
      <section className="relative group">
        
        {/* ✅ Reusable Controls */}
        <FieldVisibilityControls
          visibility={formData.visibility}
          onToggle={toggleField}
          fieldLabels={fieldLabels}
        />

        {/* Info Content */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-2 px-4 py-2">
          <div className="text-center sm:text-left space-y-1 text-sm relative rounded hover:shadow hover:border-2 hover:border-blue-200 transition-all">
            
            {/* Name */}
            <EditableField
              value={formData.name}
              onChange={(val) => setFormData({ ...formData, name: val })}
              placeholder="Your Full Name"
              className={`text-5xl font-bold ${currentTheme.header}`}
            />

            {/* Role + Location */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-2">
              {formData.visibility.title && (
                <div className="flex items-center gap-1">
                  <Briefcase size={16} className="text-gray-500" />
                  <EditableField
                    value={formData.title}
                    onChange={(val) => setFormData({ ...formData, title: val })}
                    placeholder="Your Role"
                    className={`text-l font-bold ${currentTheme.subheader}`}
                  />
                </div>
              )}
              {formData.visibility.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={16} className="text-sm text-gray-500" />
                  <EditableField
                    value={formData.location}
                    onChange={(val) => setFormData({ ...formData, location: val })}
                    placeholder="Location"
                    className={`${currentTheme.body}`}
                  />
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 -mt-1 px-2">
              {formData.visibility.email && (
                <div className="flex items-center gap-1">
                  <Mail size={16} className="text-sm text-gray-500" />
                  <EditableField
                    value={formData.email}
                    onChange={(val) => setFormData({ ...formData, email: val })}
                    placeholder="Email"
                    className={`${currentTheme.body}`}
                  />
                </div>
              )}
              {formData.visibility.phone && (
                <div className="flex items-center gap-1">
                  <Phone size={16} className="text-sm text-gray-500" />
                  <EditableField
                    value={formData.phone}
                    onChange={(val) => setFormData({ ...formData, phone: val })}
                    placeholder="Phone"
                    className={`${currentTheme.body}`}
                  />
                </div>
              )}
              {formData.visibility.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin size={16} className="text-sm text-gray-500" />
                  <EditableField
                    value={formData.linkedin}
                    onChange={(val) => setFormData({ ...formData, linkedin: val })}
                    placeholder="LinkedIn URL"
                    className={`${currentTheme.body}`}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 sm:mt-0 no-print" />
        </div>
      </section>
    </div>
  );
}
