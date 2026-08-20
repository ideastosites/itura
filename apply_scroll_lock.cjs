const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const effectCode = `
  // Lock body scroll when any modal is open
  useEffect(() => {
    if (galleryOpen !== null || isModalOpen || detailedModalType !== null || selectedBrand !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [galleryOpen, isModalOpen, detailedModalType, selectedBrand]);
`;

// Insert after selectedBrand state definition
const target = "image: string | null } | null>(null);";
if (!content.includes("Lock body scroll when any modal is open")) {
    content = content.replace(target, target + "\n" + effectCode);
    fs.writeFileSync('src/App.tsx', content, 'utf8');
    console.log("Added body scroll lock.");
} else {
    console.log("Scroll lock already exists.");
}