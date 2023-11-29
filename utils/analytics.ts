export const pageview = (url: URL, id: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag("config", id, {
      page_path: url
    })
  }
}

type GTagEvent = {
  action: string,
  category: string,
  label: string,
  value: number
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value
  })
}