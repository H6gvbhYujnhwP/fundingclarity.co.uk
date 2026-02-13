ALTER TABLE `bookings` ADD `utmSource` varchar(255);--> statement-breakpoint
ALTER TABLE `bookings` ADD `utmMedium` varchar(255);--> statement-breakpoint
ALTER TABLE `bookings` ADD `utmCampaign` varchar(255);--> statement-breakpoint
ALTER TABLE `bookings` ADD `utmTerm` varchar(255);--> statement-breakpoint
ALTER TABLE `bookings` ADD `utmContent` varchar(255);--> statement-breakpoint
ALTER TABLE `bookings` ADD `referrer` varchar(512);--> statement-breakpoint
ALTER TABLE `leads` ADD `utmSource` varchar(255);--> statement-breakpoint
ALTER TABLE `leads` ADD `utmMedium` varchar(255);--> statement-breakpoint
ALTER TABLE `leads` ADD `utmCampaign` varchar(255);--> statement-breakpoint
ALTER TABLE `leads` ADD `utmTerm` varchar(255);--> statement-breakpoint
ALTER TABLE `leads` ADD `utmContent` varchar(255);--> statement-breakpoint
ALTER TABLE `leads` ADD `referrer` varchar(512);--> statement-breakpoint
ALTER TABLE `leads` ADD `leadTimeline` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `tags` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `qualityScore` int;