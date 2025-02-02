export const imageTypes = ["png", "jpg", "jpeg", "gif"];

export const assetTypes = imageTypes.concat(["pdf", "zip"]);

export class Properties {
  [key: string]: string;
}

export interface VideoIdentifier {
  service: string;
  id: string;
}

export interface VideoIdentifiers {
  videoid: string;
  videoIds: VideoIdentifier[];
}

export interface LearningResource {
  courseRoot: string;
  route: string;
  id: string;
  lrs: LearningResource[];
  files: Array<string>;
  type: string;
}

export interface LabStep {
  title: string;
  shortTitle: string;
  contentMd: string;
  route: string;
  id: string;
}

export interface LearningObject {
  id: string;
  route: string;
  type: string;
  title: string;
  summary: string;
  img: string;
  pdf: string;
  contentMd: string;
  video: string;
  videoids: VideoIdentifiers;
  frontMatter: Properties;
  los: Array<LearningObject | LabStep>;
  properties?: Properties;
  calendar?: Properties;
  hide: boolean;
}

export const loTypes = ["/note", "/book", "/archive", "/web", "/github", "/panelnote", "/paneltalk", "/panelvideo", "/talk", "/unit", "/topic"];

export const preOrder = new Map([
  ["unit", 1],
  ["talk", 2],
  ["lab", 3],
  ["note", 4],
  ["web", 5],
  ["github", 6],
  ["panelnote", 7],
  ["paneltalk", 8],
  ["archive", 9],
  ["panelvideo", 10],
  ["topic", 11],
  ["unknown", 12],
  ["", 0],
]);
