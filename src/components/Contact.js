export default function Contact() {
  const handleContact = () => {
    if (typeof window !== "undefined") {
      window.open("https://www.linkedin.com/in/yujie-peng-8276b1279/");
    } else {
      console.log(
        "Please contact me via LinkedIn: https://www.linkedin.com/in/yujie-peng-8276b1279/"
      );
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gradient">Interested?</h2>
      <p className="mb-4 text-gray-500 lg:text-lg dark:text-gray-400">
        Get in touch with us!
      </p>
      <button
        type="button"
        className="btn-primary font-semibold"
        onClick={handleContact}
        title="Click to send an email to easygrammar193@gmail.com"
      >
        CONTACT
      </button>
    </div>
  );
}
