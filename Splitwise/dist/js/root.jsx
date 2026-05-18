function Root() {
    const [tweaks, setTweak] = window.useTweaks(window.TWEAK_DEFAULTS);
    return (
      <>
        <window.App tweaks={tweaks} setTweak={setTweak} />
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection title="viewing as">
            <window.TweakSelect
              label="me"
              value={tweaks.me}
              options={["sejik","saimi","alexis","ada","jere"]}
              onChange={(v) => setTweak("me", v)}
            />
          </window.TweakSection>
          <window.TweakSection title="currency">
            <window.TweakRadio
              label="display"
              value={tweaks.displayCcy}
              options={["KRW","USD","EUR"]}
              onChange={(v) => setTweak("displayCcy", v)}
            />
          </window.TweakSection>
          <window.TweakSection title="theme">
            <window.TweakRadio
              label="palette"
              value={tweaks.bg}
              options={["cream","cool","ink"]}
              onChange={(v) => setTweak("bg", v)}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      </>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
