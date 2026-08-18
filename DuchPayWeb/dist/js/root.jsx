function Root() {
  const [settings, setSettings] = React.useState(() => {
    try {
      return { ...window.APP_DEFAULTS, ...JSON.parse(localStorage.getItem("trip-split.settings") || "{}") };
    } catch (e) {
      return window.APP_DEFAULTS;
    }
  });

  const setSetting = React.useCallback((key, value) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem("trip-split.settings", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  }, []);

  return <window.App settings={settings} setSetting={setSetting} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
