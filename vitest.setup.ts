import { installDialog } from "@/test/dialog";
import { installLinkClicks } from "@/test/links";
import { installMatchMedia } from "@/test/media";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vite-plus/test";

beforeEach(installDialog);
beforeEach(installLinkClicks);
beforeEach(() => installMatchMedia());

afterEach(cleanup);
