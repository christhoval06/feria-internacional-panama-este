export const goToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setTimeout(
        () => element.scrollIntoView({ behavior: "smooth", block: "start" }),
        100
      );
    }
  };