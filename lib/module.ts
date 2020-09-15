import path from "path";

export default function IntercomModule(this: any): void {
  const options = { ...this };

  this.addPlugin({
    src: path.resolve(__dirname, "plugin.js"),
    options,
  });
}
