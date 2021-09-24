export interface SettingsStateInterface {
  title: string;
  dynamicTitle: boolean;
}

function state(): SettingsStateInterface {
  return {
    title: '',
    dynamicTitle: true,
  };
}
export default state;
